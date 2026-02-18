import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/request";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  CHANNELS_5_3_IMPORT_API,
  CHANNELS_5_3_QUERY_KEY,
} from "@/pages/channels-5_3/constants/channels.constants.ts";

export type ChannelImportProps = {
  onSuccess?: (jobId: string) => void;
};

const useChannelImport = ({ onSuccess }: ChannelImportProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await request.post(CHANNELS_5_3_IMPORT_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
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
    onSuccess: (data) => {
      const jobId: string = data?.jobId;
      console.log("[useChannelImport] Upload success. jobId:", jobId);

      queryClient.invalidateQueries({ queryKey: [CHANNELS_5_3_QUERY_KEY] });

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
      [mutation],
  );

  return {
    handleUpload,
    loading: mutation.isPending,
  };
};

export default useChannelImport;