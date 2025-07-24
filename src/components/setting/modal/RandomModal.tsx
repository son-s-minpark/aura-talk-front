import React from "react";
import ToggleSwitch from "../../common/ToggleSwitch";
import { FaRandom } from "react-icons/fa";
import { useProfile } from "@/hooks/useProfile";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const RandomModal = () => {
  const user = useSelector((state: RootState) => state.user);
  const { useRandomChatToggle } = useProfile();

  async function setRandomChatToggle(isRandom: boolean) {
    try {
      await useRandomChatToggle.mutateAsync(isRandom);
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error(err);
    }
  }

  return (
    <div className="w-[281px] h-[139px] py-[28px] px-[22px] modal-content">
      <div className="flex">
        <FaRandom className="w-[30px] h-[30px] text-[#787878] dark:text-lightGray" />
        <h1 className="ml-[14px]">랜덤채팅 설정</h1>
      </div>
      <div className="flex mt-[28px] w-full">
        <p className="font-semibold"> 랜덤 연결 허용하기</p>
        <ToggleSwitch
          handleOn={() => setRandomChatToggle(true)}
          handleOff={() => setRandomChatToggle(false)}
          isOn={user.randomChatEnabled}
        />
      </div>
    </div>
  );
};

export default RandomModal;
