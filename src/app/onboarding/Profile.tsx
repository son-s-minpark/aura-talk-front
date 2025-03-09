"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import HobbyModal from "@/components/sign/HobbyModal";

interface ProfileProps {
  setPage: React.Dispatch<
    React.SetStateAction<"onBoarding" | "Profile" | "signup" | "profile">
  >;
}

const Profile = ({ setPage }: ProfileProps) => {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string | null>(null);
  const [isHobbyDown, setIsHobbyDown] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function onChageName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function onChageId(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  async function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files ? e.target.files[0] : null;
    if (file) {
      const prevUrl = URL.createObjectURL(file);
      setPrevImg(prevUrl);
      setImg(file);
    }
  }

  function isFull() {
    return name !== "" && id !== "";
  }

  function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  return (
    <div className="w-full h-full">
      {isHobbyDown ? (
        <div className="z-100 w-full h-full">
          <HobbyModal setIsHobbyDown={setIsHobbyDown} />
        </div>
      ) : null}
      <div className="h-[76px] w-full z-0">
        <button onClick={() => setPage("signup")}>
          <IoArrowBackOutline width={24} height={24} className="text-white" />
        </button>
      </div>
      <div className="mt-[14px] flex flex-col items-center">
        <div>
          <p className="text-[20px] font-bold text-white">프로필 입력</p>
          <div className="text-[#DBDBDB] text-[14px]">
            <p>거의 다 끝났어요!</p>
            <p>당신에 대해 알려줄래요?</p>
          </div>
        </div>

        <div className="h-[100px] w-[100px] mt-[32px] mb-[21px]">
          {prevImg ? (
            <Image
              src={prevImg}
              alt="미리보기 이미지"
              width={100}
              height={100}
              className="object-cover w-[100px] h-[100px] rounded-full"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full border-1 text-[#797C7B]" />
          )}
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex justify-center items-center w-[54px] h-[24px] bg-[#F3F6F6] text-[#797C7B] rounded-[20px] text-[14px]"
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

        <div className="flex flex-col mt-[70px] text-white">
          <div className="mb-[153px]">
            <Input
              label="이름"
              value={name}
              onChange={onChageName}
              type="text"
            />
            <Input label="아이디" value={id} onChange={onChageId} type="text" />
            <div className="w-[327px] h-[58px] font-bold mt-[30px] border-b-1">
              <p>관심사</p>
              <div className="flex w-full">
                <div className="h-[38px] w-[300px] mb-[6px] flex-none" />
                <button onClick={() => setIsHobbyDown(!isHobbyDown)}>
                  <IoChevronDown className="w-[20px] h-[20px] mb-[11px]" />
                </button>
              </div>
            </div>
          </div>

          <SignBtn
            value="가입하기"
            isFull={isFull()}
            onClick={() => onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
