import { chatRoomType } from "@/type/chat/chatRoomType";
import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

const useChat = () => {
  const useCreateChat = useMutation({
    mutationFn: async ({ name, userIds }: chatRoomType) => {
      return await axiosInstance
        .post(apiRoute.CHAT_CREATE, {
          name: name,
          userIds: userIds,
        })
        .then((res) => {
          const { data } = res;
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
    queryFn: async () => {},
  });

  return { useCreateChat, useGetChatList };
};

export default useChat;
