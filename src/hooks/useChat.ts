import { addChat, setChatList } from "@/store/chat/setChatList";
import { setPendingChatList } from "@/store/chat/setPendingChatList";
import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useChat = () => {
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
        .post(apiRoute.CHAT_CREATE, {
          name: name,
          userIds: userIds,
        })
        .then((res) => {
          const { data } = res;
          if (data.success) {
            dispatch(addChat(data.data));
            // 대충 방 목록에 해당 채팅방 하나 추가
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
  const useGetChatList = useQuery({
    queryKey: ["getChatlist"],
    queryFn: async () => {
      return axiosInstance
        .get(apiRoute.CHAT_GET_LIST)
        .then((res) => {
          const { data } = res;
          if (data.success) {
            dispatch(setPendingChatList(data));
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

  // 대기 중인 초대 목록 가져오기 요청
  const useGetPendingChatList = useQuery({
    queryKey: ["getPendingChatList"],
    queryFn: async () => {
      return axiosInstance
        .get(apiRoute.CHAT_INVITATION_PENDING)
        .then((res) => {
          const { data } = res;
          if (data.success) {
            dispatch(setChatList(data));
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

  return { useCreateChatMutation, useGetChatList, useGetPendingChatList };
};

export default useChat;
