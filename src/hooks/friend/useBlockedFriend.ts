import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useBlockedFriends = () => {
  // 차단한 친구 목록 가져오기 요청
  const useGetBlockedFriendsList = () =>
    useQuery({
      queryKey: ["getBlockedFriendsList"],
      queryFn: async () => {
        return await axiosInstance
          .get(apiRoute.FRIEND_BLOCK_LIST)
          .then((res) => {
            return res.data.success;
          })
          .catch((err) => {
            throw Error(err);
          });
      },
    });

  return { useGetBlockedFriendsList };
};
