import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase/client';

export async function POST() {
  try {
    const { data, error } = await supabase
      .from('chats_group')
      .insert([{ name: 'Empty Chat' }])
      .select()
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      throw new Error('Error creating or returning new chat group');
    }

    return NextResponse.json({ newChatGroup: data ? data[0] : null });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
