"use client"

import axios from 'axios';
import Image from 'next/image'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGen from './FormGen';
import { useState, useEffect } from 'react';

export default function Home() {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleGeneratePrompt = async (newPrompt) => {
    setPrompt(newPrompt);
  };

  useEffect(() => {
    console.log('Effect triggered');
    const fetchGeneratedPrompt = async () => {
      console.log('Making API call...');
      setLoading(true);

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/completions/?',
          {
            prompt: "write me a story",
            max_tokens: 1000,
            temperature: 0.8,
            n: 1,
            stop: '\n',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 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',
            },
          }
        );

        const generatedResponse = response.data.choices[0].text.trim();
        setGeneratedPrompt(generatedResponse);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (prompt) {
      fetchGeneratedPrompt();
    }
  }, [prompt]);

  return (
    <main className='mt-40 flex justify-center h-screen'>
      <div className='text-center'>
        <div className='mb-10 text-8xl font-medium leading-tight text-primary'> LoveDraft</div>
        <div>
          <FormGen onGeneratePrompt={handleGeneratePrompt} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            generatedPrompt && <div>{generatedPrompt}</div>
          )}
        </div>
      </div>
    </main>
  );
}
