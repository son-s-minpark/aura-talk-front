import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { profileType } from "@/type/user/profileType";
import useUserStore from "@/state/user/useUserStore";
import useProfileStore from "@/state/user/useProfileStore";

export const useProfile = () => {
  const { userData, setUserData } = useUserStore();
  const { setProfileData } = useProfileStore();

  // 사용자 프로필 가져오기 요청
  const useGetUserProfile = (id: number) => {
    return useQuery({
      queryKey: ["getProfile", id],
      queryFn: async () => {
        const res = await axiosInstance.get(apiRoute.USER_GET_PROFILE(id));
        return res.data;
      },
      enabled: !!id,
    });
  };

  // 프로필 수정/등록 요청
  const useSetProfileMutation = useMutation({
    mutationFn: async (profileData: profileType) => {
      return await axiosInstance
        .put(apiRoute.USER_PROFILE(userData.userId), profileData)
        .then((res) => {
          const { data } = res;
          if (data.success) {
            setProfileData({
              nickname: profileData.nickname,
              username: profileData.username,
              description: profileData.description,
            });
            return { success: true };
          } else {
            throw Error("프로필 수정 오류");
          }
        })

        .catch((err) => {
          console.error("put Profile error:", err);
          throw err;
        });
    },
  });

  // 랜덤채팅 설정 수정 요청
  const useRandomChatToggleMutation = useMutation({
    mutationFn: async (randomData: boolean) => {
      return await axiosInstance
        .put(apiRoute.USER_RANDOM_CHAT_TOGGLE(userData.userId), {
          randomChatEnabled: randomData,
        })
        .then((res) => {
          if (res.data.success) {
            setUserData({ randomChatEnabled: randomData });
          }
          return true;
        })
        .catch((err) => {
          console.error(err);
          return err;
        });
    },
  });

  // 프로필 이미지 가져오기 요청
  const useGetProfileImg = (id: number) => {
    return useQuery({
      queryKey: [`getProfileImg${id}`],
      queryFn: async () => {
        const res = axiosInstance.get(apiRoute.USER_IMAGE_PROFILE_GET(id));
        return res;
      },
    });
  };

  return {
    useGetUserProfile,
    useSetProfileMutation,
    useRandomChatToggleMutation,
    useGetProfileImg,
  };
};
