'use client';

import { useState } from 'react';

import Button from '@/components/buttons/Button';
import { InteractionProps } from '@/components/ChatBot/types';

const Interaction = ({ onSubmit }: InteractionProps) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      onSubmit(userInput); // Trigger the submission to the API route
      setUserInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        id='inputField'
        placeholder='Ask me something...'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className='bg-gray-100 px-3 py-2 rounded-xl border-gray-200 focus:border-gray-300'
      />
      <Button type='submit' className='ml-2'>
        Submit
      </Button>
    </form>
  );
};

export default Interaction;
