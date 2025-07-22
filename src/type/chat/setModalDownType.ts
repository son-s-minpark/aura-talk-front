export type setModalDownType = {
  setModalDown: React.Dispatch<React.SetStateAction<chatModalType>>;
};

export type chatModalType =
  | "none"
  | "sidebar"
  | "setting"
  | "share"
  | "exit"
  | "invite";
