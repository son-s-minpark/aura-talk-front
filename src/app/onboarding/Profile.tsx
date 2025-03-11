"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import InterestModal from "@/components/sign/InterestModal";
import Back from "@/components/sign/Back";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";

interface ProfileProps {
  setPage: React.Dispatch<
    React.SetStateAction<"onBoarding" | "signin" | "signup" | "profile">
  >;
}

const Profile = ({ setPage }: ProfileProps) => {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string | null>(null);
  const [isInterestDown, setIsInterestDown] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function onChageName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function onChageId(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  function onChageDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
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
      <div
        className={clsx("z-100 w-full h-full", {
          hidden: !isInterestDown,
        })}
      >
        <InterestModal setIsInterestDown={setIsInterestDown} />
      </div>
      <div
        className={clsx("flex flex-col items-center", {
          hidden: isInterestDown,
        })}
      >
        <Back setPage={setPage} backComponent={"signup"} />
        <div className="mt-[14px]">
          <div>
            <p className="text-[20px] font-bold text-white text-center">
              프로필 입력
            </p>
          </div>
          <div className="text-[#DBDBDB] text-[14px] text-center mt-[19px]">
            <p>거의 다 끝났어요!</p>
            <p>당신에 대해 더 알려줄래요?</p>
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

        <div className="flex flex-col mt-[15px] text-white">
          <div>
            <Input
              label="이름"
              value={name}
              onChange={onChageName}
              type="text"
            />
            <Input label="아이디" value={id} onChange={onChageId} type="text" />
            <Input
              label="한 줄 소개"
              value={description}
              onChange={onChageDescription}
              type="text"
            />
            <div className="w-[327px] h-[58px] font-bold mt-[30px] border-b-1">
              <p>관심사</p>
              <div className="flex w-full">
                <div className="h-[38px] w-[300px] mb-[6px] flex-none" />
                <button onClick={() => setIsInterestDown(!isInterestDown)}>
                  <IoChevronDown className="w-[20px] h-[20px] mb-[11px]" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-[51px]">
            <SignBtn
              value="가입하기"
              isFull={isFull()}
              onClick={() => onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
