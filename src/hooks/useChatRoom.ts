import { addChattingChat, setChattingList } from "@/store/chat/setChatList";
import { setPendingList } from "@/store/chat/setChatList";
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
            dispatch(addChattingChat(data.data));
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
  const useGetChatList = () => {
    return useQuery({
      queryKey: ["getChatlist"],
      queryFn: async () => {
        return axiosInstance
          .get(apiRoute.CHATROOM_GET_LIST)
          .then((res) => {
            const { data } = res;
            if (data.success) {
              dispatch(setChattingList(data));
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
  };

  // 대기 중인 초대 목록 가져오기 요청
  const useGetPendingList = () => {
    return useQuery({
      queryKey: ["getPendingList"],
      queryFn: async () => {
        return axiosInstance
          .get(apiRoute.CHATROOM_INVITATION_PENDING)
          .then((res) => {
            const { data } = res;
            if (data.success) {
              dispatch(setPendingList(data));
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
  };

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

  return {
    useCreateChatMutation,
    useGetChatList,
    useGetPendingList,
    useChatRoomExitMutation,
  };
};

export default useChatRoom;
