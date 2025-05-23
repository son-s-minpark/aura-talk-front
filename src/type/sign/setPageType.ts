export type setPageType = {
  setPage: React.Dispatch<React.SetStateAction<onBoardingType>>;
};

export type onBoardingType = {
  page: pageType;
};

export type pageType =
  | "onBoarding"
  | "signin"
  | "signup"
  | "profile"
  | "profileImg";
