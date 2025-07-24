import { setCurrChat } from "@/store/chat/setCurrChat";
import { apiRoute } from "@/util/api/apiRoute";
import axiosInstance from "@/util/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useInvitationChat = () => {
  const dispatch = useDispatch();

  // 초대 코드 생성 요청
  const useCreateInviteCode = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await axiosInstance
        .post(apiRoute.CHATROOM_CREATE_INVITE_LINK(id))
        .then((res) => {
          if (res.data.success) {
            const { data } = res;
            dispatch(
              setCurrChat({
                inviteCode: data.inviteCode,
                inviteCodeExpiredAt: data.expiredAt,
                inviteLink: data.inviteLink,
              })
            );
          }
        })
        .catch((err) => {
          throw Error(err);
        });
    },
  });

  // 초대 코드 친구에게 보내기 요청
  const useSendInvite = useMutation({
    mutationFn: async ({
      roomId,
      userId,
    }: {
      roomId: number;
      userId: number;
    }) => {
      return axiosInstance
        .post(apiRoute.CHATROOM_FRIEND_INVITE(roomId), {
          userId: userId,
        })
        .then((res) => {
          if (res.data.success) {
            const { data } = res;
            dispatch(
              setCurrChat({
                inviteCode: data.inviteCode,
                inviteCodeExpiredAt: data.expiredAt,
                inviteLink: data.inviteLink,
              })
            );
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  // 초대코드로 방 입장하기 요청
  const useJoinChatRoom = useMutation({
    mutationFn: async (code: string) => {
      await axiosInstance
        .post(apiRoute.CHATROOM_JOIN, { inviteCode: code })
        .then((res) => {
          return res.data.success;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  });

  return {
    useCreateInviteCode,
    useSendInvite,
    useJoinChatRoom,
  };
};
