import { create } from "zustand";
import { signType } from "@/type/sign/signType";

type SignupState = {
  signupData: signType;
  updateSignupState: (newData: Partial<signType>) => void;
};

const useSignupState = create<SignupState>((set) => ({
  signupData: {
    mail: "",
    pw: "",
  },
  updateSignupState: (newData) =>
    set((state) => ({ signupData: { ...state.signupData, ...newData } })),
}));

export default useSignupState;
