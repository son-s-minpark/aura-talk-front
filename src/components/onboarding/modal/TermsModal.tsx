"use client";
import React, { useEffect, useState } from "react";
import Checkbox from "@/components/common/CheckBtn";
import SelectBtn from "@/components/common/SelectBtn";
import { useRouter } from "next/navigation";

const TermsModal = () => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isFirChecked, setIsFirChecked] = useState<boolean>(false);
  const [isSecChecked, setIsSecChecked] = useState<boolean>(false);
  const router = useRouter();

  function handleIsAllChecked() {
    const newIsAllChecked = !isAllChecked;
    setIsAllChecked(newIsAllChecked);
    setIsFirChecked(newIsAllChecked);
    setIsSecChecked(newIsAllChecked);
  }

  const handleCheckboxChange = (checkbox: "fir" | "sec", checked: boolean) => {
    if (checkbox === "fir") {
      setIsFirChecked(checked);
    } else if (checkbox === "sec") {
      setIsSecChecked(checked);
    }
  };

  useEffect(() => {
    if (isFirChecked && isSecChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [isFirChecked, isSecChecked]);

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
      className="modal-content bg-[#2A2A2A] text-white h-[207px] w-[333px]"
    >
      <div
        className="h-[67px] w-full border-b-1 border-[var(--color-commonGray)] px-[24px] pt-[25px] pb-[22px] flex items-center"
        onClick={handleIsAllChecked}
      >
        <Checkbox isChecked={isAllChecked} />
        <div className="w-full flex justify-between ml-[16px]">
          <p className="text-[20px] font-bold">약관 전제 동의</p>
        </div>
      </div>

      <div className="flex flex-col gap-[9px] px-[24px]">
        <div
          className="flex pt-[27px]"
          onClick={() => handleCheckboxChange("fir", !isFirChecked)}
        >
          <Checkbox isChecked={isFirChecked} />
          <div className="w-full flex justify-between items-center ml-[16px]">
            <p className="text-[14px] font-medium">
              이용약관에 동의합니다. (필수)
            </p>
            <p className="text-[#999999] text-[10px] underline">내용 보기</p>
          </div>
        </div>

        <div
          className="flex"
          onClick={() => handleCheckboxChange("sec", !isSecChecked)}
        >
          <Checkbox isChecked={isSecChecked} />
          <div className="w-full flex justify-between items-center ml-[16px]">
            <p className="text-[14px] font-medium">
              서비스약관에 동의합니다. (필수)
            </p>
            <p className="text-[#999999] text-[10px] underline">내용 보기</p>
          </div>
        </div>
      </div>

      <div className="mb-[21px] mr-[19px] mt-[25px] flex justify-end">
        <SelectBtn label="완료" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default TermsModal;
