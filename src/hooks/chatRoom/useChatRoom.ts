import { addChat, setChatList } from "@/store/chat/setChatList";
import { setCurrChat } from "@/store/chat/setCurrChat";
import { RootState } from "@/store/store";
import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

const useChatRoom = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // 그룹 채팅방 생성 요청
  const useCreateChatRoom = useMutation({
    mutationFn: async ({
      name,
      userIds,
    }: {
      name: string;
      userIds: number[];
    }) => {
      return await axiosInstance
        .post(apiRoute.CHATROOM_CREATE, {
          name: name,
          userIds: userIds,
        })
        .then((res) => {
          const { data } = res;
          if (data.success) {
            dispatch(addChat(data.data));
            return { success: true, roomId: data.data.id };
          } else {
            throw new Error("채팅방 생성 에러");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 개인 채팅방 생성 요청
  const useCreateOnetoOneChatRoom = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .post(apiRoute.CHATROOM_CREATE_ONE_TO_ONE, {
          targetUserId: id,
        })
        .then((res) => {
          if (res.data.success) {
            return res.data.data.id;
          } else {
            throw new Error("개인 채팅 생성 에러");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 랜덤 채팅방 생성 요청
  const useCreateRandomChatroom = useMutation({
    mutationFn: async () => {
      await axiosInstance
        .post(apiRoute.RANDOMCHAT_START, { interests: user.interests })
        .then((res) => {
          if (res.data.success) {
            return res.data.data.id;
          } else {
            throw new Error("랜덤 채팅 생성 오류");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 채팅방 수정 요청
  const usePutChatRoom = useMutation({
    mutationFn: async ({
      id,
      name,
      imageUrl,
    }: {
      id: number;
      name: string;
      imageUrl: string;
    }) => {
      await axiosInstance
        .put(apiRoute.CHATROOM_PUT_ROOM(id), {
          name: name,
          roomImageUrl: imageUrl,
        })
        .then((res) => {
          if (res.data.success) {
            dispatch(setCurrChat(res.data.data));
          } else {
            throw new Error("채팅방 정보 수정 오류");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 참여 중인 채팅방 목록 가져오기 요청
  const useGetChatList = () =>
    useQuery({
      queryKey: ["getChatlist"],
      queryFn: async () => {
        return await axiosInstance
          .get(apiRoute.CHATROOM_GET_LIST)
          .then((res) => {
            const { data } = res;
            console.error(data);
            if (data.success) {
              dispatch(setChatList(data.data));
              return data;
            } else {
              throw new Error("채팅방 가져오기 오류");
            }
          })
          .catch((err) => {
            throw new Error("채팅방 가져오기 오류:", err);
          });
      },
    });

  // 채팅방 정보 가져오기
  const useGetChatRoom = (id: number) =>
    useQuery({
      queryKey: ["getChatRoom", id],
      queryFn: async () => {
        return await axiosInstance
          .get(apiRoute.CHATROOM_GET_ROOM(id))
          .then((res) => {
            if (res.data.success) {
              dispatch(setCurrChat(res.data.data));
              return res.data.data;
            } else {
              throw new Error("채팅방 정보 가져오기 오류");
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      },
    });

  // 채팅방 나가기 요청
  const useExitChatRoom = useMutation({
    mutationFn: async (id: number) => {
      return await axiosInstance
        .delete(apiRoute.CHATROOM_EXIT_ROOM(id))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw Error(err);
        });
    },
  });

  // 채팅방 알림 on/off 요청
  const useChatNotification = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return await axiosInstance
        .put(apiRoute.CHATROOM_NOTIFICATION(id), {
          enabled: isActive,
        })
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw Error(err);
        });
    },
  });

  const getSearchedChatRoom = async (keyword: string) => {
    await axiosInstance.get(apiRoute.CHATROOM_SEARCH);
  };

  return {
    useCreateChatRoom,
    useGetChatList,
    useGetChatRoom,
    useExitChatRoom,
    useChatNotification,
    useCreateOnetoOneChatRoom,
    usePutChatRoom,
    useCreateRandomChatroom,
    getSearchedChatRoom,
  };
};

export default useChatRoom;
