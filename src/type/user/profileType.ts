export type profileType = {
  nickname: string;
  username: string;
  description: string;
  interests: string[];
};

export type profileImgType = {
  s3Key?: string;
  originalImgUrl: string;
  thumbnailImgUrl: string;
  isDefaultImg: boolean;
};
