export type setModalDownType = {
  setModalDown: React.Dispatch<React.SetStateAction<chatModalTpe>>;
};

export type chatModalTpe =
  | "none"
  | "sidebar"
  | "setting"
  | "share"
  | "exit"
  | "invite";
