"use client";
import React, { useEffect, useState } from "react";
import CheckBtn from "@/components/common/CheckBtn";
import { useRouter } from "next/navigation";

type CheckType = "all" | "fir" | "sec" | "thr";

const TermsModal = () => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isFirChecked, setIsFirChecked] = useState<boolean>(false);
  const [isSecChecked, setIsSecChecked] = useState<boolean>(false);
  const [isThrChecked, setIsThrChecked] = useState<boolean>(false);
  const router = useRouter();

  function handleIsAllChecked() {
    const newIsAllChecked = !isAllChecked;
    setIsAllChecked(newIsAllChecked);
    setIsFirChecked(newIsAllChecked);
    setIsSecChecked(newIsAllChecked);
    setIsThrChecked(newIsAllChecked);
  }

  const handlecheckChange = (check: CheckType, checked: boolean) => {
    if (check === "fir") {
      setIsFirChecked(checked);
    } else if (check === "sec") {
      setIsSecChecked(checked);
    } else if (check === "thr") {
      setIsThrChecked(checked);
    }
  };

  useEffect(() => {
    if (isFirChecked && isSecChecked && isThrChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [isFirChecked, isSecChecked, isThrChecked]);

  function onSubmit() {
    if (isAllChecked) {
      router.push("/home");
    } else {
      // 모두 체크되지 않았다면 아무것도 하지 않음
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-content bg-[#2A2A2A] text-white h-[226px] w-[333px]"
    >
      <div
        className="h-[67px] w-full border-b-1 border-[var(--color-commonGray)] px-[24px] pt-[25px] pb-[22px] flex items-center"
        onClick={handleIsAllChecked}
      >
        <CheckBtn isChecked={isAllChecked} />
        <div className="w-full flex justify-between items-center ml-[16px]">
          <p className="text-[20px] font-bold">약관 전제 동의</p>
          <p className="text-[#999999] text-[10px] underline">내용 보기</p>
        </div>
      </div>

      <div className="flex flex-col gap-[9px] px-[24px]">
        <div
          className="flex pt-[27px]"
          onClick={() => handlecheckChange("fir", !isFirChecked)}
        >
          <CheckBtn isChecked={isFirChecked} />
          <div className="w-full flex items-center ml-[16px]">
            <p className="text-[14px] font-medium">
              개인정보 약관에 동의합니다. (필수)
            </p>
          </div>
        </div>

        <div
          className="flex"
          onClick={() => handlecheckChange("sec", !isSecChecked)}
        >
          <CheckBtn isChecked={isSecChecked} />
          <div className="w-full flex items-center ml-[16px]">
            <p className="text-[14px] font-medium">
              서비스 약관에 동의합니다. (필수)
            </p>
          </div>
        </div>

        <div
          className="flex"
          onClick={() => handlecheckChange("thr", !isThrChecked)}
        >
          <CheckBtn isChecked={isThrChecked} />
          <div className="w-full flex items-center ml-[16px]">
            <p className="text-[14px] font-medium">14세 이상입니다. (필수)</p>
          </div>
        </div>
      </div>

      <div className="mb-[18px] mr-[19px] mt-[16px] flex justify-end">
        <button
          className="flex items-center justify-center rounded-[20px] bg-[#8045FF] text-white font-bold text-[14px] h-[24px] w-[54px]"
          onClick={onSubmit}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
