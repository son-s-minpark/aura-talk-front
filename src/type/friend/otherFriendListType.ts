export type otherFriendListType = "waiting" | "requesting" | "blocking";

export type otherFriendType = {
  description: string;
  friendStatus: "REQUEST_RECEIVED" | "UNDEFINED";
  friendUserId: number;
  nickname: string;
  thumbnailImageUrl: string;
  username: string;
};
