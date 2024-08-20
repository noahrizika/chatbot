import Markdown from 'markdown-to-jsx';

import { ShowConversationProps } from '@/components/ChatBot/types';

function ShowConversation({ conversation }: ShowConversationProps) {
  return (
    <div className='bg-gray-100 flex flex-col-reverse overflow-y-auto h-64 mb-4 rounded-3xl border border-gray-200'>
      {conversation.map((chat) => (
        <div key={chat.id} className='mx-5 my-4'>
          {/* user */}
          <div className='flex justify-end'>
            <div className='relative max-w-s text-right pl-16'>
              <p className='mx-2 text-sm text-gray-500'>User</p>
              <div className='relative p-3 rounded-2xl bg-blue-500 text-white'>
                {chat.user_input}
              </div>
            </div>
          </div>
          {/* chatbot */}
          <div className='flex justify-start'>
            <div className='relative max-w-s text-left pr-16'>
              <p className='mx-4 text-sm text-gray-500'>ChatBot</p>
              <div className='relative p-3 rounded-2xl bg-gray-200 text-gray-800'>
                <Markdown>{chat.response}</Markdown>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* chatbot intro message */}
      <div className='flex justify-start mx-4 my-4'>
        <div className='relative max-w-s text-left pr-16'>
          <p className='mx-4 text-sm text-gray-500'>ChatBot</p>
          <div className='relative p-3 rounded-2xl bg-gray-200 text-gray-800'>
            Please enter an academic field of study, and I'll provide details
            about researchers in that field. The more specific the research area
            you input, the higher accuracy I provide.
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShowConversation;
