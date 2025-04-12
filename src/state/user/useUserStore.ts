import { create } from "zustand";
import { userType } from "@/type/user/userType";

type setProfileType = {
  userData: userType;
  setUserData: (newData: Partial<userType>) => void;
};

const useUserState = create<setProfileType>((set) => ({
  userData: {
    userId: 0,
    status: "OFFLINE",
    randomChatEnabled: true,
    createdAt: "",
  },
  setUserData: (newData) =>
    set((state) => ({ userData: { ...state.userData, ...newData } })),
}));

export default useUserState;
