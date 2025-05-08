import { useMutation } from "@tanstack/react-query";

export const useImageUpload = () => {
  const useImageUpload = useMutation({ mutationFn: async () => {} });
  return useImageUpload;
};
