import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/request";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  FLOWS_5_1_IMPORT_API,
  FLOWS_5_1_QUERY_KEY,
} from "@/pages/flows-5_1/constants/flows.constants.ts";

export type FlowImportProps = {
  onSuccess?: () => void;
};
const useFlow_5_1_Import = ({
                              onSuccess,
                            }: FlowImportProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return request.post(FLOWS_5_1_IMPORT_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (error: never) => {
      toast({
        variant: "destructive",
        title: t(get(error, "response.statusText", "Error")),
        description: t(
            get(
                error,
                "response.data.message",
                "Fayl yuklashda xatolik yuz berdi",
            ),
        ),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FLOWS_5_1_QUERY_KEY] });
      toast({
        variant: "success",
        title: t("Success"),
        description: t("Fayl muvaffaqiyatli yuklandi"),
      });
      onSuccess?.();
    },
  });
  const handleUpload = useCallback(
      (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        mutation.mutate(formData);
      },
      [mutation],
  );
  return {
    handleUpload,
    loading: mutation.isPending,
  };
};

export default useFlow_5_1_Import;