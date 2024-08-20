import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const chat = await req.json();

    const { error } = await supabase.from('chats').insert([
      {
        group_id: chat.group_id,
        user_input: chat.user_input,
        response: chat.response,
      },
    ]);

    if (error) {
      throw new Error(`Error submitting to Supabase: ${error.message}`);
    }

    return NextResponse.json({ message: 'Chat message uploaded successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
