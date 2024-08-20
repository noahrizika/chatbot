import { supabase } from './client';
import { Chat } from './interfaces';

export const getEarliestChat: (
  groupUUID: string
) => Promise<Chat[] | null> = async (groupUUID: string) => {
  const { data, error } = await supabase
    .from('chats')
    .select()
    .eq('group_id', groupUUID)
    .order('timestamp', { ascending: true })
    .limit(1);

  if (error) {
    throw new Error(`Error fetching earliest chat: ${error.message}`);
  }

  return data;
};

// Returns an array of type Chat, which contains all interactions of the same group
export const fetchConversationHistory: (
  groupID: string
) => Promise<Chat[]> = async (groupID: string) => {
  if (!groupID) {
    // throw new Error(`groupID is null`);
    return [];
  }

  const { data, error } = await supabase
    .from('chats')
    .select('id, group_id, user_input, response, timestamp')
    .eq('group_id', groupID);

  if (error) {
    throw new Error(`Error fetching conversation history: ${error.message}`);
  }

  const conversation: Chat[] = [];

  data.forEach((chat_row) => {
    conversation.push({
      id: chat_row.id,
      group_id: chat_row.group_id,
      user_input: chat_row.user_input,
      response: chat_row.response,
      timestamp: chat_row.timestamp,
    });
  });

  const sortedConversation = conversation.sort((a, b) => {
    const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;

    return timeB - timeA;
  });

  return sortedConversation;
};
