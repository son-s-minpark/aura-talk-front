import React from "react";
import ToggleSwitch from "../../common/ToggleSwitch";
import { FaRandom } from "react-icons/fa";
import useUserStore from "@/state/user/useUserStore";
import { useProfile } from "@/hooks/useProfile";
import { AxiosError } from "axios";

const RandomModal = () => {
  const { userData, setUserData } = useUserStore();
  const { useRandomChatToggleMutation } = useProfile();

  async function setRandomChatToggle(isRandom: boolean) {
    try {
      const res = await useRandomChatToggleMutation.mutateAsync({
        randomChatEnabled: isRandom,
      });
      console.error(res);
      setUserData({ randomChatEnabled: isRandom });
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error(err);
    }
  }

  return (
    <div className="w-[281px] h-[139px] py-[28px] px-[22px] modal-content">
      <div className="flex">
        <FaRandom className="w-[30px] h-[30px] text-[#787878] dark:text-lightGray" />
        <p className="text-[20px] font-bold ml-[14px]">랜덤채팅 설정</p>
      </div>
      <div className="flex mt-[28px] w-full">
        <p className="font-semibold"> 랜덤 연결 허용하기</p>
        <ToggleSwitch
          handleOn={() => setRandomChatToggle(true)}
          handleOff={() => setRandomChatToggle(false)}
          isOn={userData.randomChatEnabled}
        />
      </div>
    </div>
  );
};

export default RandomModal;
