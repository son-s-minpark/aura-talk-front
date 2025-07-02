import { friendStatusType } from "../friend/friendStatusType";
import { profileImageType } from "./profileImageType";

export type friendUserType = {
  id: number;
  status: "ONLINE" | "OFFLINE";
  friendStatus: friendStatusType;
  randomChatEnabled: boolean;
  createdAt: string;
  nickname: string;
  username: string;
  description: string;
  interests: string[];
  profileImage: profileImageType;
};
