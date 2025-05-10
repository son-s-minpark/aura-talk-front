export type profileType = {
  nickname: string;
  username: string;
  description: string;
  interests: string[];
  profileImg: {
    s3Key?: string;
    originalImgUrl: string;
    thumbnailImgUrl: string;
    isDefaultImg: boolean;
  };
};

export type randomChatType = {
  randomChatEnabled: boolean;
};
