import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import useProfileStore from "@/state/user/useProfileStore";
import InterestBtnList from "../InterestBtnList";
import { InterestBtnBig } from "../InterestBtn";
import SelectBtn from "@/components/common/SelectBtn";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useInterest } from "@/hooks/useInterest";
import { AxiosError } from "axios";

type InterestModalProps = {
  setIsInterestDown: React.Dispatch<React.SetStateAction<boolean>>;
  isOnBoarding: boolean;
};

type Interest = {
  id: number;
  name: string;
  category: string;
};

type InterestGroup = {
  category: string;
  interests: Interest[];
};

const InterestModal = ({
  setIsInterestDown,
  isOnBoarding,
}: InterestModalProps) => {
  const { profileData } = useProfileStore();
  const { useGetTotalInterestList } = useInterest();

  const { data, isLoading, isError, error } = useGetTotalInterestList();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    const err = error as AxiosError;
    return (
      <>
        <p>Error!</p>
        <ErrorMessage msg={err.message} />
      </>
    );
  }

  const totalInterestList = data?.data.data as InterestGroup[];

  return (
    <div
      className={`w-full h-full flex flex-col items-center overflow-scroll ${
        isOnBoarding ? "bg-black" : ""
      }`}
    >
      <div className="flex w-[327px] h-[50px] font-bold mt-[39px] border-b-1 items-end text-white">
        <div className="h-[38px] w-[300px] flex-none flex">
          <InterestBtnList isScrollable={true} />
        </div>
        <button
          className="mb-[7px] text-[#999999]"
          onClick={() => setIsInterestDown(false)}
        >
          <IoIosArrowUp className="w-[20px] h-[20px]" />
        </button>
      </div>

      <div className="flex flex-col items-start px-[17px] mt-[38px]">
        {totalInterestList.map((group) => (
          <div key={group.category} className="w-full mb-[81px]">
            <p className="text-[20px] font-bold mt-[24px] text-white">
              {group.category}
            </p>
            <div className="flex flex-wrap">
              {group.interests.map((interest) => (
                <div key={interest.id} className="mt-[15px] mr-[10px]">
                  <InterestBtnBig
                    label={interest.name}
                    selected={profileData.interests.includes(interest.name)}
                    isOnBoarding={isOnBoarding}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end mr-[21px] mb-[35px]">
        <SelectBtn
          label="완료"
          onClick={() => setIsInterestDown(false)}
          isOnBoarding={true}
        />
      </div>
    </div>
  );
};

export default InterestModal;
