import { setFriendList } from "@/store/friend/setFriendList";
import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useFriend = () => {
  const dispatch = useDispatch();

  // 친구 목록 가져오기 요청
  const useGetFriendList = () => {
    return useQuery({
      queryKey: ["getFriendList"],
      queryFn: async () => {
        try {
          await axiosInstance
            .get(apiRoute.FRIEND_GET)
            .then((res) => {
              if (res.data.success) {
                const data = res.data.data;
                dispatch(setFriendList(data));
                return data;
              } else {
                throw new Error("친구 목록 가져오기 오류");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        } catch {}
      },
    });
  };

  return { useGetFriendList };
};
