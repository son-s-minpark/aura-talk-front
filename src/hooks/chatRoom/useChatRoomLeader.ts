import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

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

  const useGetBlockedChatUserList = (id: number) =>
    useQuery({
      queryKey: ["getBlockedChatUserList"],
      queryFn: async () => {
        return axiosInstance
          .get(apiRoute.CHATROOM_GET_BLOCKED_CHAT_USER(id))
          .then((res) => {
            if (res.data.success) {
              return res.data.data;
            } else {
              throw new Error("차단된 사용자 가져오기 오류");
            }
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
    useGetBlockedChatUserList,
    useKickUser,
    useUnbanUser,
  };
};

export default useChatRoomLeader;
