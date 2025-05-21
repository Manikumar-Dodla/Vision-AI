import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import { classifyPrompt } from '../langchain/classifier.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  const imagePath = req.file?.path;
  const prompt = req.body?.prompt;

  if (!imagePath || !prompt) {
    return res.status(400).send('Missing image or prompt.');
  }

  try {
    const decisionCode = await classifyPrompt(prompt);

    if (decisionCode === 0) {
      return res.status(400).send('Prompt not related to image analysis.');
    }

    // Step 1: Run decider.py
    const deciderProcess = spawn('python', ['../scripts/decider.py', decisionCode.toString(), imagePath]);

    let deciderOutput = '';
    let deciderError = '';

    deciderProcess.stdout.on('data', (data) => {
      deciderOutput += data.toString();
    });

    deciderProcess.stderr.on('data', (data) => {
      deciderError += data.toString();
    });

    deciderProcess.on('close', (code) => {
      if (code !== 0 || deciderError.trim()) {
        return res.status(500).send(`Error in decider.py: ${deciderError.trim() || `Exited with code ${code}`}`);
      }

      let parsedResult;
      try {
        parsedResult = JSON.parse(deciderOutput);
      } catch (err) {
        return res.status(500).send('Failed to parse result from decider.py');
      }

      // Step 2: Run beautify.py
      const beautifyProcess = spawn('python', ['../scripts/beautify.py', prompt]);

      let beautifyOutput = '';
      let beautifyError = '';

      beautifyProcess.stdin.write(JSON.stringify(parsedResult));
      beautifyProcess.stdin.end();

      beautifyProcess.stdout.on('data', (data) => {
        beautifyOutput += data.toString();
      });

      beautifyProcess.stderr.on('data', (data) => {
        beautifyError += data.toString();
      });

      beautifyProcess.on('close', (code) => {
        if (code !== 0 || beautifyError.trim()) {
          return res.status(500).send(`Error in beautify.py: ${beautifyError.trim() || `Exited with code ${code}`}`);
        }

        return res.send(beautifyOutput.trim());
      });
    });

  } catch (err) {
    console.error('Upload route exception:', err);
    res.status(500).send('Internal Server Error.');
  }
});

export default router;
