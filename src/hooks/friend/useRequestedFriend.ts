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
            if (res.data.success) {
              return res.data.data;
            } else {
              throw Error("받은 친구 신청 목록 받아오기 요청 오류");
            }
          })
          .catch((err) => {
            throw Error(err);
          });
      },
    });

  // 요청 중인 친구 목록 가져오기 요청
  const useGetRequestingFriendList = () =>
    useQuery({
      queryKey: ["getRequestingFriendList"],
      queryFn: async () => {
        return await axiosInstance
          .get(apiRoute.FREIND_REQUEST_SENT_LIST)
          .then((res) => {
            if (res.data.success) {
              return res.data.data;
            } else {
              throw Error("차단한 친구 목록 받아오기 요청 오류");
            }
          })
          .catch((err) => {
            throw Error(err);
          });
      },
    });

  return { useGetWaitingFriendList, useGetRequestingFriendList };
};
