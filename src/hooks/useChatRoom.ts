import { addChat, setChatList } from "@/store/chat/setChatList";
import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useChatRoom = () => {
  const dispatch = useDispatch();

  // 채팅방 생성 요청
  const useCreateChatMutation = useMutation({
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
          console.error("signup error:", err);
          throw err;
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

  // 채팅방 나가기 요청
  const useChatRoomExitMutation = useMutation({
    mutationFn: async (id: number) => {
      return await axiosInstance
        .delete(apiRoute.CHATROOM_EXIT(id))
        .then((res) => {
          if (res.data.success) {
            return { success: true };
          } else {
            throw new Error("채팅방 나가기 오류: ", res.data);
          }
        })
        .catch((err) => {
          throw new Error("채팅방 나가기 오류: ", err);
        });
    },
  });

  // 채팅방 알림 on/off 요청
  const useChatNotificationMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return await axiosInstance
        .put(apiRoute.CHATROOM_NOTIFICATION(id), {
          enabled: isActive,
        })
        .then((res) => {
          if (res.data.success) {
            return { success: true };
          } else {
            throw new Error("채팅방 알림 on/off 오류: ", res.data);
          }
        })
        .catch((err) => {
          throw new Error("채팅방 알림 on/off 오류: ", err);
        });
    },
  });

  // 초대 코드 생성 요청
  const useCreateInviteCodeMuatation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await axiosInstance
        .post(apiRoute.CHATROOM_CREATE_INVITE_LINK(id))
        .then((res) => {
          if (res.data.success) {
            return { success: true };
          } else {
            throw new Error("초대 코드 생성 오류: ", res.data);
          }
        })
        .catch((err) => {
          throw new Error("초대 코드 생성 오류: ", err);
        });
    },
  });

  return {
    useCreateChatMutation,
    useGetChatList,
    useChatRoomExitMutation,
    useChatNotificationMutation,
    useCreateInviteCodeMuatation,
  };
};

export default useChatRoom;
