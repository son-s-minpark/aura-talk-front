import { apiRoute } from "@/api/apiRoute";
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (id: number) => {
  return useQuery({
    queryKey: ["getProfile", id],
    queryFn: async () => {
      const res = await axiosInstance.get(apiRoute.USER_GET_PROFILE(id));
      return res.data;
    },
    enabled: !!id,
  });
};
