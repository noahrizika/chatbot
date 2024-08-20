import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase/client';
import { Chat } from '@/lib/supabase/interfaces';

// Returns an array of type Chat, which contains all interactions of the same group
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const groupID = searchParams.get('groupID');

  if (!groupID) {
    return NextResponse.json(
      { error: 'Missing group groupID' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('chats')
      .select('id, group_id, user_input, response, timestamp')
      .eq('group_id', groupID);

    if (error) {
      return NextResponse.json(
        { error: 'Error fetching conversation history' },
        { status: 500 }
      );
    }

    const conversation: Chat[] = [];

    data.forEach((chat_row) => {
      conversation.push({
        id: chat_row.id,
        group_id: chat_row.group_id,
        user_input: chat_row.user_input,
        response: chat_row.response,
        timestamp: chat_row.timestamp,
      });
    });

    const sortedConversation = conversation.sort((a, b) => {
      // If a timestamp is missing, set it as a lower value (earlier time)
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;

      return timeB - timeA;
    });

    const resp = NextResponse.json({ sortedConversation });
    resp.cookies.set('token', '', {
      maxAge: 0, // Setting maxAge to 0 deletes the cookie
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return resp;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
