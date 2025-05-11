import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import useProfileImgStore from "@/state/user/useProfileImgStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ImageProps = {
  id: number;
  file: File;
};

export const useImageUpload = () => {
  const { setProfileImgData } = useProfileImgStore();

  // 프로필 이미지 업로드 (presigned -> s3 업로드 -> 업로드 완료 요청)
  const useProfileImageUploadMutation = useMutation({
    mutationFn: async ({ id, file }: ImageProps) => {
      console.error(`profile${id}`, file);
      await axiosInstance
        .post(apiRoute.USER_IMAGE_PRESIGN, `profile${id}.png`)
        .then((res) => {
          const url = res.data.data.url;
          const key = res.data.data.s3Key;

          axios
            .put(url, file, {
              headers: {
                "Content-Type": file.type,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                axiosInstance
                  .post(apiRoute.USER_IMAGE_COMPLETE, key)
                  .then((res) => {
                    const data = res.data.data;
                    console.error(data);
                    setProfileImgData({
                      s3Key: key,
                      originalImgUrl: data.originalImageUrl,
                      thumbnailImgUrl: data.thumbnailImageUrl,
                      isDefaultImg: data.defaultProfileImage,
                    });
                  });
              }
            })
            .catch((err) => console.error(err));
        });
    },
  });

  // 기본 프로필 이미지 제거
  const useDeleteProfileImageMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance
        .delete(apiRoute.USER_IMAGE_PROFILE_DELETE)
        .then((res) => {
          console.error(res);
          return res;
        })
        .catch((err) => console.error(err));
    },
  });

  return { useProfileImageUploadMutation, useDeleteProfileImageMutation };
};
