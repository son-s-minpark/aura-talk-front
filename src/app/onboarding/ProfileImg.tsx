"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Back from "@/components/header/Back";
import SignBtn from "@/components/sign/SignBtn";
import useSignupState from "@/state/useSignupState";
import InterestBtn from "@/components/sign/InterestBtn";

type ProfileImgProps = {
  setPage: React.Dispatch<
    React.SetStateAction<
      "onBoarding" | "signin" | "signup" | "profile" | "profileImg"
    >
  >;
};

const ProfileImg = ({ setPage }: ProfileImgProps) => {
  const [img, setImg] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { signupData, removeInterest } = useSignupState();
  const { InterestBtnSml } = InterestBtn;

  async function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files ? e.target.files[0] : null;
    if (file) {
      const prevUrl = URL.createObjectURL(file);
      setPrevImg(prevUrl);
      setImg(file);
    }
  }

  return (
    <div className="w-full h-full overflow-scroll">
      <Back setPage={setPage} backComponent={"profile"} />
      <div className="mt-[24px]">
        <p className="text-[20px] font-bold text-white mt-[12px] text-center leading-[20px]">
          프로필 확인
        </p>
        <div className="text-[#DBDBDB] text-[14px] text-center mt-[19px]">
          <p>마지막으로 확인할게요!</p>
          <p>다 맞게 작성했나요?</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="h-[100px] w-[100px] mt-[35px] mb-[21px]">
          {prevImg ? (
            <Image
              src={prevImg}
              alt="미리보기 이미지"
              width={100}
              height={100}
              className="object-cover w-[100px] h-[100px] rounded-full"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full border-1 text-darkGray" />
          )}
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex justify-center items-center w-[54px] h-[24px] bg-[#F3F6F6] text-darkGray rounded-[20px] text-[14px]"
        >
          편집
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={addImage}
          className="hidden"
        />
      </div>

      <div className="flex flex-col mt-[55px] ml-[37px] gap-[22px]">
        <div>
          <p className="text-lightGray text-[14px] leading-[14px]">
            사용자 이름
          </p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {signupData.name}
          </p>
        </div>
        <div>
          <p className="text-lightGray text-[14px] leading-[14px]">아이디</p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {signupData.id}
          </p>
        </div>
        <div>
          <p className="text-lightGray text-[14px] leading-[14px]">
            한 줄 소개
          </p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {signupData.description}
          </p>
        </div>
        <div>
          <p className="text-lightGray text-[14px] leading-[14px]">관심사</p>
          <div className="w-[300px] mb-[6px] flex-none flex gap-[5px] flex-wrap text-white text-[18px] font-semibold mt-[12px]">
            {signupData.interestList.map((label, index) => (
              <div key={index} onClick={() => removeInterest(label)}>
                <InterestBtnSml label={label} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[56px]">
        <SignBtn value="가입하기" isFull={true} />
      </div>
    </div>
  );
};

export default ProfileImg;
