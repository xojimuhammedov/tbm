import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/request";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  LOCAL_OUTBOUND_IMPORT_API, LOCAL_OUTBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-99 local outbound document/constants/local.outbound.constants.ts";
export type FlowImportProps = {
  onSuccess?: () => void;
};

const useLocalOutboundImport = ({
  onSuccess,
}: FlowImportProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return request.post(LOCAL_OUTBOUND_IMPORT_API, formData, {
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
      queryClient.invalidateQueries({ queryKey: [LOCAL_OUTBOUND_QUERY_KEY] });
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

export default useLocalOutboundImport;
