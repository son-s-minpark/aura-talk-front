import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setProfileImg } from "@/store/user/setProfileImg";

type ImageProps = {
  fileName: string;
  file: File;
};

export const useImageUpload = () => {
  const dispatch = useDispatch();

  // 프로필 이미지 업로드 (presigned -> s3 업로드 -> 업로드 완료)
  const useProfileImageUploadMutation = useMutation({
    mutationFn: async ({ fileName, file }: ImageProps) => {
      // presigned url 받기 요청
      try {
        const res = await axiosInstance.post(
          apiRoute.USER_IMAGE_PRESIGN,
          fileName
        );
        const url = res.data.data.url;
        const key = res.data.data.s3Key;

        // s3 업로드 요청
        const uploadResponse = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        if (uploadResponse.status === 200) {
          // 업로드 완료 요청
          const completeRes = await axiosInstance.post(
            apiRoute.USER_IMAGE_COMPLETE,
            key
          );
          const data = completeRes.data.data;

          dispatch(
            setProfileImg({
              originalImgUrl: data.originalImageUrl,
              thumbnailImgUrl: data.thumbnailImageUrl,
              isDefaultImg: data.defaultProfileImage,
            })
          );
          return data.thumbnailImageUrl;
        }
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    },
  });

  // 기본 프로필 이미지 제거
  const useDeleteProfileImageMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance
        .delete(apiRoute.USER_IMAGE_PROFILE_DELETE)
        .then((res) => {
          const data = res.data.data;
          dispatch(
            setProfileImg({
              originalImgUrl: data.originalImageUrl,
              thumbnailImgUrl: data.thumbnailImageUrl,
              isDefaultImg: data.defaultProfileImage,
            })
          );
          return { success: true };
        })
        .catch((err) => console.error(err));
    },
  });

  return {
    useProfileImageUploadMutation,
    useDeleteProfileImageMutation,
  };
};
