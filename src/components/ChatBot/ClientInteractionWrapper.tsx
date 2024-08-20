'use client';

import { useRouter } from 'next/navigation';

import Interaction from '@/components/ChatBot/Interaction';
import { ClientInteractionWrapperProps } from '@/components/ChatBot/types';

const ClientInteractionWrapper = ({
  groupID,
}: ClientInteractionWrapperProps) => {
  const router = useRouter();

  const handleSubmit = async (userInput: string) => {
    try {
      const response = await fetch('/api/supabase/chats/uploadChatMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: '',
          group_id: groupID,
          user_input: userInput,
          response: await getChatBotResponse(userInput),
          timestamp: '',
        }),
      });

      if (response.ok) {
        // router.push(`/?uuid=${uuid}&refresh=${Date.now()}`, undefined, { shallow: true }); // this syntax is for next/router, which throws a paradox of errors
        router.push(`/?groupID=${groupID}&refresh=${Date.now()}`);
        // => try doing revalidatePath so you don't need to refresh the whole page
      } else {
        throw new Error('Failed to submit interaction');
      }
    } catch (error) {
      throw new Error('Error caught while trying to submit interaction');
    }
  };

  async function getChatBotResponse(userInput: string): Promise<string> {
    const response = await fetch('/api/chatgpt/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    return data.content || 'Error occurred';
  }

  return (
    <>
      <Interaction onSubmit={handleSubmit} />
    </>
  );
};

export default ClientInteractionWrapper;
