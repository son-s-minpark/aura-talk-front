import { profileImageType } from "./profileImageType";

export type friendUserType = {
  id: number;
  status: "ONLINE" | "OFFLINE";
  friendStatus: "REQUEST_SENT" | "UNDEFINED";
  randomChatEnabled: boolean;
  createdAt: string;
  nickname: string;
  username: string;
  description: string;
  interests: string[];
  profileImage: profileImageType;
};
