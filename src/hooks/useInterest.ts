import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { apiRoute } from "@/api/apiRoute";

export const useInterest = () => {
  const useGetTotalInterestList = () => {
    return useQuery({
      queryKey: ["getTotalInterestList"],
      queryFn: async () => {
        const res = await axiosInstance.get(apiRoute.INTEREST_TOTAL);
        return res;
      },
    });
  };
  return { useGetTotalInterestList };
};
