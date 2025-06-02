import { chatUserType } from "./chatUserType";

export type chatRoomType = {
  name: string;
  id: number;
  chatRoomImg: string;
  owner: chatUserType;
  users: chatUserType[];
};
