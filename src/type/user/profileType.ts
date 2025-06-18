export type profileType = {
  nickname: string;
  username: string;
  description: string;
  interests: string[];
  profileImage: profileImgType;
};

export type profileImgType = {
  userId: number;
  originalImgUrl: string;
  thumbnailImgUrl: string;
  isDefaultImg: boolean;
};
