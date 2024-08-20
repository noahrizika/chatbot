import '@/lib/env';

import { fetchConversationHistory } from '@/lib/supabase/chats';

import ChatBot from '@/components/ChatBot/index';
import Header from '@/components/Header';

interface HomePageProps {
  searchParams: { groupID?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const groupID = searchParams.groupID || '';
  const conversation = await fetchConversationHistory(groupID);

  return (
    <div
      className='bg-cover bg-center'
      style={{
        backgroundImage: "url('/images/bubbles.jpg')",
      }}
    >
      <div className='bg-white bg-opacity-50 backdrop-blur-md'>
        <Header />
        <main className='h-full flex items-center justify-center flex-col text-center'>
          <div className='mt-16 mb-8 max-w-2xl'>
            <h1 className='text-gray-700'>Find Researchers in Any Field</h1>
            <h4 className='text-gray-600 mt-4'>
              This can help Atom in enabling researchers to connect with others
              who may share an interest in similar grants.
            </h4>
          </div>
          <div className='w-full max-w-4xl'>
            <ChatBot
              groupID={groupID}
              // chatGroups={chatGroups}
              conversation={conversation}
            />
          </div>
        </main>
        <footer className='bg-gray-800 text-white p-4 text-center mt-16'>
          <p>&copy; 2024 ExpertsConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
