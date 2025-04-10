export type setPageType = {
  setPage: React.Dispatch<
    React.SetStateAction<
      "onBoarding" | "signin" | "signup" | "profile" | "profileImg"
    >
  >;
};
