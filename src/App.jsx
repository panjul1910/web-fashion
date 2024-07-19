import { useState, useEffect } from 'react';
import { Light as SyntaxHighLight } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import './App.css';
import {Groq} from 'groq-sdk';

const GroqAPI = import.meta.env.VITE_GROQ;

const groq = new Groq({
  apiKey: GroqAPI,
  dangerouslyAllowBrowser: true,
});

const requestGroqAI = async (content) => {
  const response = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      {role: 'user', content,},
    ],
  });
  return 'FaQ-AI : ' + response.choices[0].message.content;
};

function App() {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Wait...');
  const [second, setSecond] = useState(5);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setSecond(prev => {
          if (prev > 0) {
            setLoadingText('Wait ' + prev + ' second');
            return prev - 1;
          } else {
            setLoadingText('Wait...');
            return 5;
          }
        });
      }, 1000);
    } else {
      setLoadingText('Wait...');
      setSecond(5);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const Tanya = () => {
    setIsLoading(true);
    setTimeout( async () => {
      const AI = await requestGroqAI(content.value);
      setData(AI);
      setIsLoading(false);
    }, 5000);
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-[10vh] max-w-xl w-full  mx-auto'>
      <h1 className='text-4xl text-indigo-500'>FaQ-AI by Panjul1910</h1><br />
      <form className='flex flex-col gap-4 py-4'>
        <input type="text" id="content" className='py-2 px-4 text-md rounded-md' placeholder='Ingin Bertanya?' autoComplete='off'/>
        <button className='bg-indigo-500 text-white px-4 py-2 rounded-md font-bold' onClick={Tanya} type='button'>{isLoading ? loadingText : 'Kirim'}</button>
      </form>
      <div className='max-w-xl w-full mx-auto'>
        {data ? (
        <SyntaxHighLight language='swift' style={darcula} wrapLongLines={true}>{data}</SyntaxHighLight>
        ) : null}
      </div>
    </main>
  );
}

export default App
