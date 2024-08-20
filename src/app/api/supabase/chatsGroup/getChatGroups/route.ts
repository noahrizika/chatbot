import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('chats_group')
      .select()
      .order('timestamp', { ascending: false });

    if (error) {
      throw new Error('Error fetching chat groups from Supabase');
    }

    const response = NextResponse.json({ chatGroups: data ?? [] });

    // Set cache-control headers to prevent caching
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
