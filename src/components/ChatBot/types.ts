import { Chat, ChatGroup } from '@/lib/supabase/interfaces';

export interface ShowConversationProps {
  conversation: Chat[];
}

export interface ShowConversationWrapperProps {
  groupID: string;
  baseUrl: string;
}

export interface ChooseConversationProps {
  chatGroups: ChatGroup[];
}

export interface InteractionProps {
  onSubmit: (userInput: string) => void;
}

export interface PopupProps {
  // chatGroups: ChatGroup[];
  handleButtonClick: (groupID: string) => void;
}

export interface ClientInteractionWrapperProps {
  groupID: string;
}

export interface ChatBotProps {
  groupID: string;
  // chatGroups: ChatGroup[];
  conversation: Chat[];
}

export interface ClientButtonProps {
  chatGroup: ChatGroup | null;
}

export interface ChooseButtonProps {
  chatGroups: ChatGroup[];
}
