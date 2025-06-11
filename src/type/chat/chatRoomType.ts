import { chatUserType } from "./chatUserType";

export type chatRoomType = {
  id: number;
  name: string;
  type: "ONE_TO_ONE" | "GROUP" | "RANDOM" | "UNDEFINED";
  roomImageUrl: string;
  owner: chatUserType;
  users: chatUserType[];
  active: boolean;
  createdAt?: Date;
  lastMessageAt?: Date;
  inviteCode?: string;
  inviteCodeExpiredAt?: string;
};
