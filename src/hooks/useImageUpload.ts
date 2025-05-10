import { apiRoute } from "@/api/apiRoute";
import axiosInstance from "@/api/axiosInstance";
import useProfileStore from "@/state/user/useProfileStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ImageProps = {
  id: number;
  file: File;
};

export const useImageUpload = () => {
  const { setProfileData } = useProfileStore();
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
                    setProfileData({
                      profileImg: {
                        s3Key: key,
                        originalImgUrl: data.originalImageUrl,
                        thumbnailImgUrl: data.thumbnailImageUrl,
                        isDefaultImg: data.defaultProfileImage,
                      },
                    });
                  });
              }
            })
            .catch((err) => console.error(err));
        });
    },
  });

  return { useProfileImageUploadMutation };
};
