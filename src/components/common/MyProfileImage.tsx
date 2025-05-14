import React from "react";
import Image from "next/image";
import useProfileImgStore from "@/state/user/useProfileImgStore";

const MyProfileImage = () => {
  const { profileImgData } = useProfileImgStore();
  return (
    <>
      {profileImgData.thumbnailImgUrl && (
        <Image
          src={profileImgData.thumbnailImgUrl}
          alt="Profile"
          fill
          className="rounded-full object-cover"
        />
      )}
    </>
  );
};

export default MyProfileImage;
