"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import { IoArrowBackOutline } from "react-icons/io5";
import SignBtn from "@/components/sign/SignBtn";

interface ProfilePros {
  setPage: React.Dispatch<
    React.SetStateAction<"onBoarding" | "Profile" | "signup" | "profile">
  >;
}

const Profile = ({ setPage }: ProfilePros) => {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [img, setImg] = useState<Blob | null>(null);
  const [prevImg, setPrevImg] = useState<Blob | null>(null);

  function onChageName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function onChageid(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  function isFull() {
    return name != "" && id != "";
  }

  function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // 대충 로그인 요청 코드
  }

  return (
    <div>
      <div className="h-[76px] w-full">
        <button onClick={() => setPage("signup")}>
          <IoArrowBackOutline width={24} height={24} className="text-white" />
        </button>
      </div>
      <div className="mt-[69px] flex flex-col items-center">
        <div>
          <div className="">
            <p className="text-[20px] font-bold text-white">프로필 입력</p>
          </div>
          <div className="text-[#DBDBDB] text-[14px]">
            <p>거의 다 끝났어요!</p>
            <p>당신에 대해 알려줄래요?</p>
          </div>
        </div>
        <div>
          <form>
            <input type="image" />
            <button> 편집 </button>
          </form>
        </div>
        <div className="flex flex-col mt-[70px] text-white">
          <div className="mb-[153px]">
            <Input
              label="이름"
              value={name}
              onChange={onChageName}
              type="text"
            />

            <Input label="아이디" value={id} onChange={onChageid} type="text" />

            <div>
              {/* 와 이걸 어떡하면 좋지 너무 어려운데??????????????? */}
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
