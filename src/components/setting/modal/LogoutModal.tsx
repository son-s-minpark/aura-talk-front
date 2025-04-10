import React from "react";
import { MdLogout } from "react-icons/md";
import SelectBtn from "../../common/SelectBtn";
import { useAuth } from "@/hooks/useAuth";

const LogoutModal = () => {
  const { useLogoutMutation } = useAuth();

  async function onLogout() {
    const res = await useLogoutMutation.mutateAsync();
    console.error(res);
  }

  return (
    <div className=" w-[281px] h-[139px] py-[28px] px-[22px] modal-content">
      <div className="flex">
        <MdLogout className="w-[30px] h-[30px] text-[#787878] dark:text-lightGray" />
        <p className="text-[20px] font-bold ml-[14px]">로그아웃하기</p>
      </div>
      <div className="flex mt-[16px] w-full">
        <p className="text-[12px]"> 로그아웃 하시겠습니까?</p>
      </div>
      <div className="flex justify-end">
        <SelectBtn label="확인" onClick={onLogout} />
      </div>
    </div>
  );
};

export default LogoutModal;
