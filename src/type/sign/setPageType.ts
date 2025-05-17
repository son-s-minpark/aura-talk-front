export type setPageType = {
  setPage: React.Dispatch<React.SetStateAction<onBoardingType>>;
};

export type onBoardingType = {
  page: "onBoarding" | "signin" | "signup" | "profile" | "profileImg";
};
