import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import useMutate from "@/shared/hooks/api/useMutate";
import { useToast } from "@/shared/hooks/useToast";
import { useTranslation } from "react-i18next";

export interface ReviewPayload {
  status: "REJECTED";
  comment?: string;
}

export const useRejectDocument = (id: string, onSuccess?: () => void) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { query: rejectQuery } = useMutate<any>({
    url: [`rh-252/share/${id}/review`],
    method: MutateRequestMethod.PATCH,
    options: {
      onSuccess: () => {
        toast({
          variant: "success",
          title: t("Success", { defaultValue: "Success" }),
          description: t("Muvaffaqiyatli saqlandi", {
            defaultValue: "Muvaffaqiyatli saqlandi",
          }),
        });
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: t("Error", { defaultValue: "Xatolik" }),
          description:
            error?.response?.data?.message ||
            t("Xatolik yuz berdi", { defaultValue: "Xatolik yuz berdi" }),
        });
      },
    },
  });

  return { rejectQuery, isPending: rejectQuery.isPending };
};
