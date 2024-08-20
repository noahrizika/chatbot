import { NextRequest, NextResponse } from 'next/server';

import { Chat } from '@/lib/supabase/interfaces';

export async function POST(req: NextRequest) {
  try {
    const { group_id, user_input } = await req.json();

    const chatBotResponse = await getChatBotResponse(user_input);

    const newInteraction: Chat = {
      id: '',
      group_id,
      user_input,
      response: chatBotResponse,
      timestamp: '',
    };

    const response = await uploadChatToSupabase(newInteraction);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to update conversation' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, newInteraction },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error occurred: ${error}` },
      { status: 500 }
    );
  }
}

async function getChatBotResponse(userInput: string): Promise<string> {
  const response = await fetch('http://localhost:3000/api/chatgpt/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  return data.content || 'Error occurred';
}

async function uploadChatToSupabase(newInteraction: Chat) {
  const response = await fetch(
    'http://localhost:3000/api/supabase/chats/uploadChatMessage/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInteraction),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload chat to Supabase');
  }

  return response;
}
