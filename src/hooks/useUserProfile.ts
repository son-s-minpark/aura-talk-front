import { apiRoute } from "@/api/apiRoute";
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  const useGetUserProfile = (id: number) => {
    useQuery({
      queryKey: [`getProfile${id}`],
      queryFn: () => {
        const res = axiosInstance.get(apiRoute.USER_PROFILE(id));
        return res;
      },
    });
  };

  return { useGetUserProfile };
};
