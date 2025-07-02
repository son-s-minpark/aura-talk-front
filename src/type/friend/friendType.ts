import { friendStatusType } from "./friendStatusType";

export type friendType = {
  description: string;
  friendStatus: friendStatusType;
  friendUserId: number;
  nickname: string;
  thumbnailImageUrl: string;
  username: string;
};
