import React, { useCallback } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { Button } from "dgz-ui/button";
import { Form, MyTextarea } from "dgz-ui-shared/components/form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type RejectForm = { reason: string };

export type RejectReasonModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (reason: string) => void;
  submitting?: boolean;
};

const RejectReasonModal: React.FC<RejectReasonModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  submitting,
}) => {
  const { t } = useTranslation();
  const form = useForm<RejectForm>({ defaultValues: { reason: "" } });

  const handleSubmit = useCallback(
    (values: RejectForm) => {
      const reason = values.reason?.trim();
      if (!reason) return;
      onSubmit(reason);
    },
    [onSubmit],
  );

  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      header={t("Reject document")}
      size={"2xl"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="px-2">
          <MyTextarea<RejectForm>
            control={form.control}
            name="reason"
            label={t("Reason")}
            placeholder={t("Enter reason for rejection")}
            className="min-h-[120px]"
            required
          />

          <div className="flex items-center justify-between border-t pt-3 mt-3 gap-3">
            <Button
              type="button"
              variant="secondary"
              disabled={submitting}
              onClick={() => onOpenChange(false)}
            >
              {t("Cancel")}
            </Button>
            <Button type="submit">{t("Submit")}</Button>
          </div>
        </form>
      </Form>
    </MyModal>
  );
};

export default RejectReasonModal;
