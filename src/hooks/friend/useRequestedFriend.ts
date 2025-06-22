import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useRequestedFriend = () => {
  // 친구 신청 받은 목록 가져오기 요청
  const useGetWaitingFriendList = () =>
    useQuery({
      queryKey: ["getWaitingFriendList"],
      queryFn: async () => {
        return await axiosInstance
          .get(apiRoute.FREIND_REQUEST_RECEIVED_LIST)
          .then((res) => {
            const data = res.data;
            if (data.success) {
              return data.data;
            } else {
              throw new Error("받은 친구 요청 가져오기 에러");
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      },
    });

  const useGetRequestingFriendList = () =>
    useQuery({
      queryKey: ["getRequestingFriendList"],
      queryFn: async () => {
        return await axiosInstance
          .get(apiRoute.FREIND_REQUEST_SENT_LIST)
          .then((res) => {
            const data = res.data;
            if (data.success) {
              return data.data;
            } else {
              throw new Error("받은 친구 요청 가져오기 에러");
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      },
    });

  return { useGetWaitingFriendList, useGetRequestingFriendList };
};
