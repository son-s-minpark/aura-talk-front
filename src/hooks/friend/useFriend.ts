import { setFriendList } from "@/store/friend/setFriendList";
import { RootState } from "@/store/store";
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
              console.error(data);
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
  const useRequestFriendMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .post(apiRoute.FRIEND_REQUEST(id))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw Error(err);
        });
    },
  });

  // 친구인지 확인
  const isFriend = (id: number) => {
    return friendList.find((item) => item.friendUserId === id);
  };

  // 받은 친구 신청 수락 요청
  const useAcceptFriendMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .put(apiRoute.FRIEND_REQUEST_ACCEPT(id))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw Error(err);
        });
    },
  });

  // 받은 친구 신청 거절 요청
  const useRejectFriendMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .delete(apiRoute.FRIEND_REQUEST_REJECT(id))
        .then((res) => {
          console.error(res);
          return res.data.data;
        })
        .catch((err) => {
          throw Error(err);
        });
    },
  });

  // 보낸 친구 신청 취소 요청
  const useCancelFriendRequestMuration = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .delete(apiRoute.FRIEND_REQUEST_SENT_CANCEL(id))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw Error(err);
        });
    },
  });

  // 친구 차단하기 요청
  const useBlockFriendMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .post(apiRoute.FRIEND_BLOCK(id))
        .then((res) => {
          console.error(res);
          return res.data.success;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 친구 차단 취소 요청
  const useCancelBlockFriendMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .delete(apiRoute.FRIEND_BLOCK(id))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 친구 삭제하기 요청
  const useDeleteFriendMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .delete(apiRoute.FRIEND_DELETE(id))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  return {
    useGetFriendList,
    useRequestFriendMutation,
    isFriend,
    useAcceptFriendMutation,
    useRejectFriendMutation,
    useCancelFriendRequestMuration,
    useBlockFriendMutation,
    useCancelBlockFriendMutation,
    useDeleteFriendMutation,
  };
};
