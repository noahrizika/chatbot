'use client';

import React, { useState } from 'react';

import { ChatGroup } from '@/lib/supabase/interfaces';

import Button from '@/components/buttons/Button';
import { PopupProps } from '@/components/ChatBot/types';

const Popup = ({ handleButtonClick }: PopupProps) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [chatGroups, setChatGroups] = useState([] as ChatGroup[]);

  async function updateChatGroupNames() {
    try {
      const response = await fetch(
        '/api/supabase/chatsGroup/setAllChatsGroupNames',
        {
          method: 'POST',
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Error updating chatgroup names:', result.error);
      }
    } catch (error) {
      throw new Error('Error caught while trying to updating chatgroup names');
    }
  }

  async function getChatGroups() {
    try {
      const response = await fetch('/api/supabase/chatsGroup/getChatGroups', {
        method: 'GET',
      });

      const result = await response.json();

      if (response.ok) {
        return result.chatGroups as ChatGroup[];
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw new Error('Error caught while trying to get chatgroups');
    }
  }

  // update chatgroup names when popup opens
  const openPopup = async () => {
    await updateChatGroupNames();

    const chatGroups = await getChatGroups();
    if (chatGroups) {
      setChatGroups(chatGroups);
    }

    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className='space-x-4'>
        <Button variant='outline' onClick={openPopup}>
          Reload Chat
        </Button>
      </div>
      {isPopupVisible && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
            {chatGroups.map((chatGroup) => (
              <Button
                key={chatGroup.id}
                className='m-4'
                variant='outline'
                onClick={() => {
                  handleButtonClick(chatGroup.id);
                  closePopup();
                }}
              >
                {chatGroup.name}
              </Button>
            ))}
            <Button className='m-4' variant='primary' onClick={closePopup}>
              {chatGroups.length === 0 ? 'No Prior Chats. ' : ''}Exit
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
