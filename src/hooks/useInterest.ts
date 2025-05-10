import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { apiRoute } from "@/api/apiRoute";

export const useInterest = () => {
  // 관심사 목록 전체 조회
  const useGetTotalInterestList = () => {
    return useQuery({
      queryKey: ["getTotalInterestList"],
      queryFn: async () => {
        const res = await axiosInstance.get(apiRoute.INTEREST_TOTAL);
        return res;
      },
    });
  };

  const useGetInterestUsers = (category: string) => {
    return useQuery({
      queryKey: ["getInterestUsers"],
      queryFn: async () => {
        const res = await axiosInstance.get(apiRoute.INTEREST_USERS(category));
        return res;
      },
    });
  };

  const useGetInterestCategory = (category: string) => {
    return useQuery({
      queryKey: ["getInterestCategory"],
      queryFn: async () => {
        const res = await axiosInstance.get(
          apiRoute.INTEREST_CATEGORY(category)
        );
        return res;
      },
    });
  };

  return {
    useGetTotalInterestList,
    useGetInterestUsers,
    useGetInterestCategory,
  };
};
