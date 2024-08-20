'use client';

import React from 'react';

import Button from '@/components/buttons/Button';
import Popup from '@/components/ChatBot/ChooseConversation/ChooseButtons/Popup';

// refresh page with groupID query
const refreshForConversationHistory = (groupUUID: string) => {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('groupID', groupUUID);

  window.location.href = currentUrl.toString();
};

const startNewChat: () => Promise<void> = async () => {
  try {
    const response = await fetch(
      '/api/supabase/chatsGroup/createNewChatGroup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create a new chat group');
    }

    const { newChatGroup } = await response.json();

    if (!newChatGroup) {
      throw new Error('A new chat group could not be created');
    }

    refreshForConversationHistory(newChatGroup.id);
  } catch (error) {
    throw new Error('Error during start new chat process');
  }
};

const ChooseButtons = () => {
  return (
    <div className='space-x-4 flex'>
      <Button variant='primary' onClick={startNewChat}>
        New Chat
      </Button>
      <Popup handleButtonClick={refreshForConversationHistory} />
    </div>
  );
};

export default ChooseButtons;
