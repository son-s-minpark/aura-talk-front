import { setFriendList } from "@/store/friend/setFriendList";
import { RootState } from "@/store/store";
import { friendType } from "@/type/friend/friendType";
import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

export const useFriend = () => {
  const dispatch = useDispatch();
  const friendList = useSelector((state: RootState) => state.friendList);

  // 친구 목록 가져오기 요청
  const useGetFriendList = () =>
    useQuery({
      queryKey: ["getFriendList"],
      queryFn: async () => {
        return await axiosInstance
          .get(apiRoute.FRIEND_GET_LIST)
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
      },
    });

  // 친구 신청하기 요청
  const useFriendRequestMutation = useMutation({
    mutationFn: async (friend: friendType) => {
      await axiosInstance
        .post(apiRoute.FRIEND_REQUEST(friend.id))
        .then((res) => {
          const data = res.data;
          if (data.success) {
          } else {
            throw new Error("친구 신청 오류");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 친구인지 확인
  const isFriend = (id: number) => {
    return friendList.find((item) => item.id === id);
  };

  return { useGetFriendList, useFriendRequestMutation, isFriend };
};
