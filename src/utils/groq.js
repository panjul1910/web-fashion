import {Groq} from 'groq-sdk';

const GroqAPI = import.meta.env.VITE_GROQ;

const groq = new Groq({
  apiKey: GroqAPI,
  dangerouslyAllowBrowser: true,
});

export const requestGroqAI = async (content) => {
  const response = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      {role: 'user', content,},
    ],
  });
  return 'FaQ-AI : ' + response.choices[0].message.content;
};

