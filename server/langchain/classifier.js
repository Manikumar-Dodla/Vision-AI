import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from 'dotenv';

dotenv.config();

const parser = new JsonOutputParser();

const prompt = PromptTemplate.fromTemplate(`
You are an AI model that classifies image analysis prompts.

Classify this prompt: "{input}"

Respond in this format:
{{
  "task": "object-identification" | "image-metadata" | "both" | "other",
  "confidence": 0.0 - 1.0
}}
`);

const llm = new ChatGoogleGenerativeAI({
  model: "models/gemini-1.5-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY
});

const chain = RunnableSequence.from([prompt, llm, parser]);

export const classifyPrompt = async (inputPrompt) => {
  const { task } = await chain.invoke({ input: inputPrompt });

  // Return numeric code based on classification
  switch (task) {
    case "image-metadata": return 1;
    case "object-identification": return 2;
    case "both": return 3;
    default: return 0; // unknown or other
  }
};
