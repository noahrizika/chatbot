export interface Chat {
  id: string | null;
  group_id: string;
  user_input: string;
  response: string;
  timestamp: string | null;
}

export interface ChatGroup {
  id: string;
  name: string;
  timestampz: string;
}
