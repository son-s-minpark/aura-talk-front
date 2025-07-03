import axiosInstance from "@/util/api/axiosInstance";
import { apiRoute } from "@/util/api/apiRoute";
import { useDispatch } from "react-redux";
import { setFriendList } from "@/store/friend/setFriendList";

// 편의를 위해 hook 폴더에 넣었지만... hook은 아닙니다
export const useFriendList = () => {
  const dispatch = useDispatch();

  const getFriendList = async () => {
    try {
      const res = await axiosInstance.get(apiRoute.FRIEND_GET_LIST);
      if (res.data.success) {
        const data = res.data.data;
        dispatch(setFriendList(data));
        return data;
      } else {
        throw new Error("친구 목록 가져오기 오류");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // 차단한 친구 목록 가져오기 함수
  const getBlockedFriendsList = async () => {
    try {
      const res = await axiosInstance.get(apiRoute.FRIEND_BLOCK_LIST);
      if (res.data.success) {
        return res.data.data;
      } else {
        throw new Error("차단한 친구 목록 가져오기 오류");
      }
    } catch (err) {
      throw new Error(String(err));
    }
  };

  // 받은 친구 신청 목록 가져오기 함수
  const getWaitingFriendList = async () => {
    try {
      const res = await axiosInstance.get(
        apiRoute.FREIND_REQUEST_RECEIVED_LIST
      );
      if (res.data.success) {
        return res.data.data;
      } else {
        throw new Error("받은 친구 신청 목록 받아오기 요청 오류");
      }
    } catch (err) {
      throw new Error(String(err));
    }
  };

  // 요청 중인 친구 목록 가져오기 요청
  const getRequestingFriendList = async () => {
    const res = await axiosInstance.get(apiRoute.FREIND_REQUEST_SENT_LIST);
    if (res.data.success) {
      return res.data.data;
    } else {
      throw new Error("요청 중인 친구 목록 받아오기 요청 오류");
    }
  };

  return {
    getFriendList,
    getBlockedFriendsList,
    getRequestingFriendList,
    getWaitingFriendList,
  };
};
