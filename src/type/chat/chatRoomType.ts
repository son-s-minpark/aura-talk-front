import { chatUserType } from "./chatUserType";

type roomType = "ONE_TO_ONE" | "GROUP" | "RANDOM" | "UNDEFINED";

export type chatRoomType = {
  id: number;
  name: string;
  type: roomType;
  chatRoomImg: string;
  owner: chatUserType;
  users: chatUserType[];
  active: boolean;
  createdAt?: Date;
  lastMessageAt?: Date;
  inviteCode?: string;
  inviteCodeExpiredAt?: string;
};

export type chatListType = {
  pendingList: chatRoomType[] | [];
  chattingList: chatRoomType[] | [];
};
