import { create } from "zustand";
import { signType } from "@/type/sign/signType";

type SignupState = {
  signupData: signType;
  setSignupData: (newData: Partial<signType>) => void;
};

const useSignupStore = create<SignupState>((set) => ({
  signupData: {
    email: "",
    password: "",
  },
  setSignupData: (newData) =>
    set((state) => ({ signupData: { ...state.signupData, ...newData } })),
}));

export default useSignupStore;
