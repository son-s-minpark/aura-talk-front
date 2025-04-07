import { create } from "zustand";
import { profileType } from "@/type/sign/profileType";

type setProfileType = {
  profileData: profileType;
  updateProfileState: (newData: Partial<profileType>) => void;
  addInterest: (interest: string) => void;
  removeInterest: (label: string) => void;
};

const useProfileState = create<setProfileType>((set) => ({
  profileData: {
    nickname: "",
    username: "",
    description: "",
    interestList: [],
  },
  updateProfileState: (newData) =>
    set((state) => ({ profileData: { ...state.profileData, ...newData } })),
  addInterest: (interest) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        interestList: [...state.profileData.interestList, interest],
      },
    })),
  removeInterest: (label) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        interestList: state.profileData.interestList.filter((i) => i !== label),
      },
    })),
}));

export default useProfileState;
