"use client";
import React, { useEffect, useState } from "react";
import Checkbox from "@/components/common/Checkbox";
import SelectBtn from "@/components/common/SelectBtn";
import { useRouter } from "next/navigation";

const TermsModal = () => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [firChecked, setFirChecked] = useState<boolean>(false);
  const [secChecked, setSecChecked] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (firChecked && secChecked) {
      setAllChecked(true);
    } else if (!firChecked && !secChecked) {
      setAllChecked(false);
    }
  }, [firChecked, secChecked]);

  const handleAllCheckedChange = () => {
    setAllChecked(!allChecked);
    setFirChecked(allChecked);
    setSecChecked(allChecked);
  };

  function onSubmit() {
    if (allChecked) {
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
        onClick={handleAllCheckedChange}
      >
        <Checkbox
          id="allChecked"
          isChecked={allChecked}
          onChange={handleAllCheckedChange}
        />
        <label htmlFor="allChecked" className="flex items-center]">
          <div className="w-full flex justify-between ml-[16px]">
            <p className="text-[20px] font-bold">약관 전제 동의</p>
          </div>
        </label>
      </div>

      <div
        className="flex flex-col gap-[9px] px-[24px]"
        onClick={() => setFirChecked(!firChecked)}
      >
        <div className="flex pt-[27px]">
          <Checkbox
            id="firChecked"
            isChecked={firChecked}
            onChange={() => setFirChecked(!firChecked)}
          />
          <label htmlFor="firChecked" className="flex w-full">
            <div className="w-full flex justify-between items-center ml-[16px]">
              <p className="text-[14px] font-medium">
                이용약관에 동의합니다. (필수)
              </p>
              <p className="text-[#999999] text-[10px] underline">내용 보기</p>
            </div>
          </label>
        </div>

        <div className="flex" onClick={() => setSecChecked(!secChecked)}>
          <Checkbox
            id="secChecked"
            isChecked={secChecked}
            onChange={() => setSecChecked(!secChecked)}
          />
          <label htmlFor="secChecked" className="flex w-full">
            <div className="w-full flex justify-between items-center ml-[16px]">
              <p className="text-[14px] font-medium">
                서비스약관에 동의합니다. (필수)
              </p>
              <p className="text-[#999999] text-[10px] underline">내용 보기</p>
            </div>
          </label>
        </div>
      </div>
      <div className="mb-[21px] mr-[19px] mt-[25px] flex justify-end">
        <SelectBtn label="완료" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default TermsModal;
