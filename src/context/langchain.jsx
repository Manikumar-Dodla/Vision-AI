// /context/langchain.js

import React, { createContext, useContext } from 'react';

const LangchainContext = createContext();

export const askLLM = async (message) => {
  try {
    const res = await fetch('/api/langchain/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.error("Error talking to AI:", err);
    return "An error occurred talking to the AI.";
  }
};

// ✅ This is what was missing in your code!
export const LangchainProvider = ({ children }) => {
  return (
    <LangchainContext.Provider value={{ askLLM }}>
      {children}
    </LangchainContext.Provider>
  );
};

export const useLangchain = () => useContext(LangchainContext);
