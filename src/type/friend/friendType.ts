import { profileImageType } from "../user/profileImageType";

export type friendType = {
  id: number;
  nickname: string;
  username: string;
  description?: string;
  interests: string[];
  friendStatus: "";
  status: "ONLINE" | "OFFLINE";
  profileImage: profileImageType;
};
