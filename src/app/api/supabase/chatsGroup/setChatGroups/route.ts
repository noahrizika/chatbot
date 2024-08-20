// import { NextResponse } from 'next/server';

// import { supabase } from '@/lib/supabase/client';

// export async function GET() {
//   try {
//     const { data, error } = await supabase
//       .from('chats_group')
//       .select()
//       .order('timestamp', { ascending: false });

//     if (error) {
//       throw new Error('Error fetching chat groups from Supabase');
//     }

//     return NextResponse.json({ chatGroups: data ?? [] });
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }
