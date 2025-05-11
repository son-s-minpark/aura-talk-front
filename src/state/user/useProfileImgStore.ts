import { create } from "zustand";
import { profileImgType } from "@/type/user/profileType";

type setProfileType = {
  profileImgData: profileImgType;
  setProfileImgData: (newData: Partial<profileImgType>) => void;
};

const useProfileImgStore = create<setProfileType>((set) => ({
  profileImgData: {
    s3Key: "",
    originalImgUrl: "",
    thumbnailImgUrl: "",
    isDefaultImg: true,
  },
  setProfileImgData: (newData) =>
    set((state) => ({
      profileImgData: { ...state.profileImgData, ...newData },
    })),
}));

export default useProfileImgStore;
