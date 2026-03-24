import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/request";

export const useFileUpload = (onSuccessAction: (file_name: string) => void) => {
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await request.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success && data.file_name) {
        onSuccessAction(data.file_name);
      }
    },
  });

  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        mutation.mutate(file);
      }
    },
    [mutation],
  );

  return { handleUpload, loading: mutation.isPending };
};
