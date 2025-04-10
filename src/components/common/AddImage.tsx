"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

type AddImageProps = {
  imgSize: number;
  btnHeight: number;
  btnWidth: number;
};

const AddImage = ({ imgSize, btnHeight, btnWidth }: AddImageProps) => {
  const [img, setImg] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files ? e.target.files[0] : null;
    if (file) {
      const prevUrl = URL.createObjectURL(file);
      setPrevImg(prevUrl);
      setImg(file);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="mb-[15px]"
        style={{ height: `${imgSize}px`, width: `${imgSize}px` }}
      >
        {prevImg ? (
          <Image
            src={prevImg}
            alt="미리보기 이미지"
            width={100}
            height={100}
            className="object-cover  rounded-full"
          />
        ) : (
          <div
            className="rounded-full border-1 text-commonGray"
            style={{ height: `${imgSize}px`, width: `${imgSize}px` }}
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex justify-center items-center bg-[#F3F6F6] text-commonGray rounded-[20px] text-[14px]"
        style={{ height: `${btnHeight}px`, width: `${btnWidth}px` }}
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
  );
};

export default AddImage;
