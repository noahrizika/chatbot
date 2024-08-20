import ChooseButtons from '@/components/ChatBot/ChooseConversation/ChooseButtons/index';


const ChooseConversation = () => {
  return (
    <div className='bg-gray-100 flex justify-center items-center space-y-4 h-64 mb-4 rounded-3xl border border-gray-200'>
      <ChooseButtons />
    </div>
  );
};

export default ChooseConversation;
