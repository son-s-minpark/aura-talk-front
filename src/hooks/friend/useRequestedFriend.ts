import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useRequestedFriend = () => {
  const useGetWaitingFriendList = () => {
    return useQuery({
      queryKey: ["getWaitingFriendList"],
      queryFn: async () => {
        axiosInstance
          .get(apiRoute.FREIND_REQUEST_RECEIVED_LIST)
          .then((res) => {
            if (res.data.success) {
              return res.data.data;
            } else {
              throw new Error("받은 친구 요청 가져오기 에러");
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      },
    });
  };
  return { useGetWaitingFriendList };
};
