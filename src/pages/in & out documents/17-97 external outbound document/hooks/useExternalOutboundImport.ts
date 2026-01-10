import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/request";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  EXTERNAL_OUTBOUND_IMPORT_API, EXTERNAL_OUTBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-97 external outbound document/constants/external.outbound.constants.ts";
export type FlowImportProps = {
  onSuccess?: () => void;
};

const useExternalOutboundImport = ({
  onSuccess,
}: FlowImportProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return request.post(EXTERNAL_OUTBOUND_IMPORT_API, formData, {
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
      queryClient.invalidateQueries({ queryKey: [EXTERNAL_OUTBOUND_QUERY_KEY] });
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

export default useExternalOutboundImport;
