import { onBoardingType } from "@/type/sign/setPageType";
import React from "react";

const introData = [
  {
    page: "signin",
    title: "로그인하기",
    intro: ["다시 만나서 반가워요!", "친구들의 소식을 확인하러 가볼까요?"],
  },
  {
    page: "signup",
    title: "회원가입하기",
    intro: ["만나서 반가워요!", "새로운 친구들을 만들러 가볼까요?"],
  },
  {
    page: "profile",
    title: "프로필 입력",
    intro: ["거의 다 끝났어요!", "당신에 대해 더 알려줄래요?"],
  },
  {
    page: "profileImg",
    title: "프로필 확인",
    intro: ["마지막으로 확인할게요!", "다 맞게 작성했나요?"],
  },
];

const Introduction = ({ page }: onBoardingType) => {
  const currentData = introData.find((item) => item.page === page);

  if (!currentData) {
    return <p>잘못된 페이지입니다.</p>;
  }

  return (
    <div className="flex flex-col items-center text-white">
      <p className="text-[20px] font-bold text-white leading-[20px] mb-[19px]">
        {currentData.title}
      </p>
      {currentData.intro.map((line, index) => (
        <p key={index} className="text-[#DBDBDB] text-[14px] leading-[20px]">
          {line}
        </p>
      ))}
    </div>
  );
};

export default Introduction;
