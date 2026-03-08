import useMutate from "@/shared/hooks/api/useMutate";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import { useToast } from "@/shared/hooks/useToast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface ReviewPayload {
  status: "ACCEPTED" | "REJECTED";
  comment?: string;
}

export const useReviewDocument = (id: string, onSuccess?: () => void) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { query: reviewQuery } = useMutate<any>({
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
        navigate("/rh-252/agreement-decrees");
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

  return { reviewQuery, isPending: reviewQuery.isPending };
};
