import { getEarliestChat } from '@/lib/supabase/chats';
import { Chat, ChatGroup } from '@/lib/supabase/interfaces';

import { supabase } from './client';

const removeChatGroupByID: (id: string) => Promise<void> = async (
  id: string
) => {
  const { error } = await supabase.from('chats_group').delete().eq('id', id);

  if (error) {
    throw new Error('Error deleting chatgroup');
  }
};

// Assigns a name for one chatgroup, as specified by a chat's ID
export const setNameOrRemoveChatGroup: (
  groupUUID: string
) => Promise<void> = async (groupUUID: string) => {
  const earliestChat: Chat[] | null = await getEarliestChat(groupUUID);

  // Remove the chatgroup if it contains no chats
  if (!earliestChat || !earliestChat[0]) {
    await removeChatGroupByID(groupUUID);
    return;
  }

  const { error } = await supabase
    .from('chats_group')
    .update({ name: earliestChat[0].user_input })
    .eq('id', groupUUID);

  if (error) {
    throw new Error('Error updating chatgroup name');
  }
};

export const setAllChatGroupNames = async () => {
  const { data, error } = await supabase.from('chats_group').select();
  if (error) {
    throw new Error('Error fetching chat groups');
  }

  if (!data) {
    return 'No chat groups found';
  }

  for (const chatGroup of data) {
    await setNameOrRemoveChatGroup(chatGroup.id);
  }
};

export const fetchChatGroups = async () => {
  const { data, error } = await supabase
    .from('chats_group')
    .select()
    .order('timestamp', { ascending: false });

  if (error) {
    throw new Error('Error fetching chat groups from Supabase');
  }

  //! cant fetch chat groups? error?? look back at the api getChatGroups
  return (data as ChatGroup[]) ?? [];
};
