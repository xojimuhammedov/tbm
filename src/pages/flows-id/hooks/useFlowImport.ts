import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/request";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  FLOWS_IMPORT_API,
  FLOWS_ID_QUERY_KEY,
} from "@/pages/flows-id/constants/flows.constants.ts";

export type FlowImportProps = {
  status?: string;
  onSuccess?: (jobId: string) => void;
};

const useFlowImport = ({
                         status = "active",
                         onSuccess,
                       }: FlowImportProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await request.post(`${FLOWS_IMPORT_API}/${status}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onError: (error: never) => {
      toast({
        variant: "destructive",
        title: t(get(error, "response.statusText", "Error")),
        description: t(
            get(error, "response.data.message", "Fayl yuklashda xatolik yuz berdi")
        ),
      });
    },
    onSuccess: (data) => {
      const jobId: string = data?.jobId;
      console.log("[useFlowImport] Upload success. jobId:", jobId);

      queryClient.invalidateQueries({ queryKey: [FLOWS_ID_QUERY_KEY] });

      toast({
        title: t("Upload Started"),
        description: t("Import jarayoni boshlandi..."),
      });

      onSuccess?.(jobId);
    },
  });

  const handleUpload = useCallback(
      (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        mutation.mutate(formData);
      },
      [mutation]
  );

  return {
    handleUpload,
    loading: mutation.isPending,
  };
};

export default useFlowImport;