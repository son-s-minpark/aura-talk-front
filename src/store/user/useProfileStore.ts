import { create } from "zustand";
import { profileType } from "@/type/user/profileType";

type setProfileType = {
  profileData: profileType;
  setProfileData: (newData: Partial<profileType>) => void;
  addInterest: (interest: string) => void;
  removeInterest: (label: string) => void;
};

const useProfileStore = create<setProfileType>((set) => ({
  profileData: {
    nickname: "",
    username: "",
    description: "",
    interests: [],
    profileImg: {
      s3Key: "",
      originalImgUrl: "",
      thumbnailImgUrl: "",
      isDefaultImg: true,
    },
  },
  setProfileData: (newData) =>
    set((state) => ({ profileData: { ...state.profileData, ...newData } })),
  addInterest: (interest) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        interests: [...state.profileData.interests, interest],
      },
    })),
  removeInterest: (label) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        interests: state.profileData.interests.filter((i) => i !== label),
      },
    })),
}));

export default useProfileStore;
