import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo-none.png";
import Terms from "@/data/terms.json";

const Page = () => {
  return (
    <div className="w-full h-full overflow-scroll">
      {/* 상단 로고 및 타이틀 */}
      <div className="flex gap-[19px] mt-[19px] ml-[16px] items-center">
        <Image src={logo} alt="로고" className="w-[55px] h-[55px]" />
        <p className="text-[20px] font-extrabold">Aura Talk 이용 약관</p>
      </div>

      <div className="mt-[15px] flex flex-col items-center gap-[30px]">
        {Object.values(Terms).map((termData, index) => (
          <div key={index} className="w-full max-w-[320px]">
            <p className="text-[20px] font-bold mb-[10px]">{termData.title}</p>

            <div className="w-full h-[500px] overflow-y-scroll bg-[#505050cc] rounded-[20px] p-[20px]">
              {termData.sections.map((section, secIndex) => (
                <div key={secIndex}>
                  <p className="font-semibold mb-[10px]">{section.title}</p>
                  <div className="text-[11px] leading-relaxed   ">
                    {Array.isArray(section.content) ? (
                      section.content.map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-[5px]">
                          {line}
                        </p>
                      ))
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
