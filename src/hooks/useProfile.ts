import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setUser } from "@/store/user/setUser";
import { profileImageType } from "@/type/user/profileImageType";

type profileType = {
  nickname: string;
  username: string;
  description: string;
  interests: string[];
  profileImage: profileImageType;
};

export const useProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

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

  // 내 프로필 가져오기 요청
  const useGetMyProfile = () => {
    return useQuery({
      queryKey: ["myProfile"],
      queryFn: async () => {
        await axiosInstance
          .get(apiRoute.USER_MY_PROFILE)
          .then((res) => {
            if (res.data.success) {
              const data = res.data.data;
              dispatch(setUser(data));
              return data;
            } else {
              throw new Error("내 프로필 가져오기 오류");
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      },
    });
  };

  // 프로필 수정/등록 요청
  const useSetProfileMutation = useMutation({
    mutationFn: async (profileData: profileType) => {
      return await axiosInstance
        .put(apiRoute.USER_PUT_PROFILE, {
          nickname: profileData.nickname,
          username: profileData.username,
          description: profileData.description,
          interests: profileData.interests,
        })
        .then((res) => {
          const { data } = res;
          if (data.success) {
            dispatch(
              setUser({
                nickname: profileData.nickname,
                username: profileData.username,
                description: profileData.description,
                interests: profileData.interests,
              })
            );
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
        .put(apiRoute.USER_RANDOM_CHAT_TOGGLE(user.userId), {
          randomChatEnabled: randomData,
        })
        .then((res) => {
          if (res.data.success) {
            dispatch(setUser({ randomChatEnabled: randomData }));
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
  const getProfileImg = async () => {
    const res = await axiosInstance.get(
      apiRoute.USER_IMAGE_PROFILE_GET(user.userId)
    );
    const data = res.data.data;
    console.error(data);

    dispatch(setUser({ profileImage: data }));
  };

  return {
    useGetUserProfile,
    useGetMyProfile,
    useSetProfileMutation,
    useRandomChatToggleMutation,
    getProfileImg,
  };
};
