import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const useChatRoomLeader = () => {
  // 채팅방 삭제 요청
  const useDeleteChatRoom = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance
        .delete(apiRoute.CHATROOM_DELETE(id))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 채팅방에서 유저 강퇴 요청
  const useKickUser = useMutation({
    mutationFn: async ({
      chatId,
      userId,
    }: {
      chatId: number;
      userId: number;
    }) => {
      await axiosInstance
        .delete(apiRoute.CHATROOM_KICK_USER(chatId, userId))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 강퇴한 사용자 취소 요청
  const useUnbanUser = useMutation({
    mutationFn: async ({
      chatId,
      userId,
    }: {
      chatId: number;
      userId: number;
    }) => {
      await axiosInstance(apiRoute.CHATROOM_UNBAN_USER(chatId, userId))
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  return {
    useDeleteChatRoom,
    useKickUser,
    useUnbanUser,
  };
};

export default useChatRoomLeader;
