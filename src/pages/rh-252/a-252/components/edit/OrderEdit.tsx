import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "dgz-ui/dialog";
import { Button } from "dgz-ui/button";
import { useToast } from "@/shared/hooks/useToast";
import { request } from "@/request";
import { get } from "lodash";
import { Label } from "dgz-ui";
import { Input } from "dgz-ui/form";

interface EditCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: string | null;
  currentCode?: string;
  onSuccess?: () => void;
}

interface FormData {
  code: string;
}

const EditCodeModal = ({
  open,
  onOpenChange,
  documentId,
  currentCode = "",
  onSuccess,
}: EditCodeModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      code: currentCode,
    },
  });

  useEffect(() => {
    if (open) {
      reset({ code: currentCode });
    }
  }, [open, currentCode, reset]);

  const onSubmit = async (data: FormData) => {
    if (!documentId) return;

    try {
      await request.patch("/api/rh-252/orderv2", {
        id: documentId,
        code: Number(data.code),
      });

      toast({
        variant: "success",
        title: t("Success"),
        description: t("Code updated successfully"),
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t(`${get(error, "response.statusText", "Error")}`),
        description: t(
          `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
        ),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Edit Code")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">{t("Code")}</Label>
              <Input
                id="code"
                type="number"
                placeholder={t("Enter code")}
                {...register("code", {
                  required: t("Code is required"),
                  min: {
                    value: 1,
                    message: t("Code must be greater than 0"),
                  },
                })}
              />
              {errors.code && (
                <p className="text-sm text-red-500">{errors.code.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="default"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t("Cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("Saving...") : t("Save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCodeModal;
