import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setUser } from "@/store/user/setUser";

type ImageProps = {
  fileName: string;
  file: File;
};

export const useImageUpload = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // 프로필 이미지 업로드 (presigned -> s3 업로드 -> 업로드 완료)
  const useUploadProfileImage = useMutation({
    mutationFn: async ({ fileName, file }: ImageProps) => {
      // presigned url 받기 요청
      try {
        const res = await axiosInstance.post(
          apiRoute.USER_IMAGE_PRESIGNED_URL,
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
            setUser({
              profileImage: {
                userId: user.id,
                originalImageUrl: data.originalImageUrl,
                thumbnailImageUrl: data.thumbnailImageUrl,
                isDefaultImg: data.defaultProfileImage,
              },
            })
          );
          return { success: true };
        }
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    },
  });

  // 기본 프로필 이미지 제거
  const useDeleteProfileImage = useMutation({
    mutationFn: async () => {
      await axiosInstance
        .delete(apiRoute.USER_IMAGE_PROFILE_DELETE)
        .then((res) => {
          const data = res.data.data;

          dispatch(
            setUser({
              profileImage: {
                userId: user.id,
                originalImageUrl: data.originalImageUrl,
                thumbnailImageUrl: data.thumbnailImageUrl,
                isDefaultImg: data.defaultProfileImage,
              },
            })
          );
          return { success: true };
        })
        .catch((err) => console.error(err));
    },
  });

  const useUploadChatRoomImage = useMutation({
    mutationFn: async ({ file, fileName }: ImageProps) => {
      try {
        const res = await axiosInstance.post(
          apiRoute.CHATROOM_PRESIGNED_URL,
          fileName
        );
        const { url, s3Key } = res.data.data;

        const uploadResponse = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        if (uploadResponse.status === 200) {
          const completeRes = await axiosInstance.post(
            apiRoute.CHATROOM_UPLOAD_COMPLETE,
            { s3Key }
          );
          return { url: completeRes.data.data.originalImageUrl };
        }

        throw new Error("Image upload failed");
      } catch (err) {
        console.error("Image upload failed:", err);
        throw err;
      }
    },
  });

  return {
    useUploadProfileImage,
    useDeleteProfileImage,
    useUploadChatRoomImage,
  };
};
