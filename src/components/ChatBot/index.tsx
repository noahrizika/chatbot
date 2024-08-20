import ChooseConversation from '@/components/ChatBot/ChooseConversation/index';
import ClientInteractionWrapper from '@/components/ChatBot/ClientInteractionWrapper';
import ShowConversation from '@/components/ChatBot/ShowConversation';
import { ChatBotProps } from '@/components/ChatBot/types';

const ChatBot = ({ groupID, conversation }: ChatBotProps) => {
  return (
    <div>
      {!groupID ? (
        <ChooseConversation />
      ) : (
        <div>
          <ShowConversation conversation={conversation} />
          <ClientInteractionWrapper groupID={groupID} />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
