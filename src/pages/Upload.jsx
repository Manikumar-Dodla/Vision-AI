import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const appendMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleImageUpload = (file) => {
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);

    appendMessage({
      text: 'Image uploaded! You can now ask something about it.',
      image: url,
      isUser: false,
    });
  };

  const handleSendMessage = async (text) => {
    if (!image) {
      appendMessage({
        text: 'Please upload an image before asking a question.',
        isUser: false,
      });
      return;
    }

    const userMsg = {
      text,
      isUser: true,
    };

    appendMessage(userMsg);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('prompt', text);

      console.log('[DEBUG] Sending request to backend with prompt:', text, 'and image:', image);

      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.text();

      console.log('[DEBUG] Received response from backend:', data);
      
      appendMessage({
        text: data || 'No response from server.',
        isUser: false,
      });
      
    } catch (err) {
      console.error('[DEBUG] Error connecting to the server:', err);
      appendMessage({
        text: 'Error connecting to the server.',
        isUser: false,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="pb-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-200 mb-2">Image Chat Assistant</h1>
          <p className="text-gray-400">Upload an image and ask anything — AI will respond.</p>
        </div>

        <div>
          <div className="flex flex-col h-[600px]">
            <Card className="flex-1 flex flex-col overflow-hidden p-0">
              <div className="p-4 border-b border-dark-500">
                <h2 className="text-lg font-medium text-gray-200">AI Assistant</h2>
                <p className="text-sm text-gray-400">Chat with your AI using image context</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[70%] ${
                        msg.isUser ? 'bg-blue-600 text-white' : 'bg-dark-600 text-gray-200'
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="User uploaded"
                          className="mb-2 rounded-md w-full object-cover"
                        />
                      )}
                      <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="text-center text-gray-400">Analyzing image...</div>
                )}

                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center p-4">
                    <div className="max-w-sm">
                      <p className="text-gray-400 mb-2">Upload an image and chat with your AI assistant.</p>
                      <p className="text-gray-500 text-sm">
                        Results will be summarized using Gemini AI via LangChain.
                      </p>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <div className="p-4 border-t border-dark-500">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={image ? "Ask about the image..." : "Upload an image first..."}
                    className="flex-1 px-4 py-2 bg-dark-600 border border-dark-500 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={!image}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleSendMessage(e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />

                  <label htmlFor="chat-image-upload" className="cursor-pointer px-3 py-2 bg-dark-500 rounded-md hover:bg-dark-400 transition-colors">
                    📷
                    <input
                      id="chat-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </label>

                  <button
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!image}
                    onClick={() => {
                      const text = inputRef.current.value.trim();
                      if (text) {
                        handleSendMessage(text);
                        inputRef.current.value = '';
                      }
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
