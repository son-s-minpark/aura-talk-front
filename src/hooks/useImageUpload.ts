import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import useProfileImgStore from "@/state/user/useProfileImgStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ImageProps = {
  fileName: string;
  file: File;
};

export const useImageUpload = () => {
  const { setProfileImgData } = useProfileImgStore();

  // 프로필 이미지 업로드 (presigned -> s3 업로드 -> 업로드 완료 요청)
  const useProfileImageUploadMutation = useMutation({
    mutationFn: async ({ fileName, file }: ImageProps) => {
      try {
        const res = await axiosInstance.post(
          apiRoute.USER_IMAGE_PRESIGN,
          fileName
        );
        const url = res.data.data.url;
        const key = res.data.data.s3Key;

        const uploadResponse = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        if (uploadResponse.status === 200) {
          const completeRes = await axiosInstance.post(
            apiRoute.USER_IMAGE_COMPLETE,
            key
          );
          const data = completeRes.data.data;

          setProfileImgData({
            s3Key: key,
            originalImgUrl: data.originalImageUrl,
            thumbnailImgUrl: data.thumbnailImageUrl,
            isDefaultImg: data.defaultProfileImage,
          });
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
        .then(async (res) => {
          console.error(res);
          return res;
        })
        .catch((err) => console.error(err));
    },
  });

  return {
    useProfileImageUploadMutation,
    useDeleteProfileImageMutation,
  };
};
