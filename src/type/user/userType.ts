import { profileImageType } from "./profileImageType";

export type userType = {
  userId: number;
  status: "ONLINE" | "OFFLINE";
  randomChatEnabled: boolean;
  createdAt: string;
  nickname: string;
  username: string;
  description: string;
  interests: string[];
  profileImage: profileImageType;
};
