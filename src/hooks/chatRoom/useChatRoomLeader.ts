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
          return res.data;
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

  // 채팅방에서 차단한 사용자 리스트 가져오기 요청
  const getBlockedChatUserList = async (id: number) => {
    try {
      const res = await axiosInstance.get(
        apiRoute.CHATROOM_GET_BLOCKED_CHAT_USER(id)
      );
      if (res.data.success) {
        return res.data.data;
      } else {
        throw new Error("차단된 사용자 가져오기 오류");
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  };

  // 강퇴한 사용자 취소 요청
  const useUnbanUser = useMutation({
    mutationFn: async ({
      chatId,
      userId,
    }: {
      chatId: number;
      userId: number;
    }) => {
      await axiosInstance
        .put(apiRoute.CHATROOM_UNBAN_USER(chatId, userId))
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
    getBlockedChatUserList,
    useKickUser,
    useUnbanUser,
  };
};

export default useChatRoomLeader;
