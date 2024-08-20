import { NextResponse } from 'next/server';

import { setNameOrRemoveChatGroup } from '@/lib/supabase/chatsGroup'; // Assuming this is where your function lives
import { supabase } from '@/lib/supabase/client';

export async function POST() {
  try {
    const { data, error } = await supabase.from('chats_group').select();
    if (error) {
      throw new Error('Error fetching chat groups');
    }

    if (!data) {
      return NextResponse.json({ message: 'No chat groups found' });
    }

    for (const chatGroup of data) {
      await setNameOrRemoveChatGroup(chatGroup.id);
    }

    return NextResponse.json({
      message: 'All chat group names set successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
