import React, { useCallback, useMemo, useState } from "react";
import { CircleX } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { useTranslation } from "react-i18next";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import RejectReasonModal from "@/shared/components/moleculas/documents/RejectReasonModal.tsx";

type Url = string | number;

type RejectActionProps = {
  baseKey: Url[];
  id: Url;
  onUpdated?: () => void;
  disabled?: boolean;
};

const RejectAction: React.FC<RejectActionProps> = ({
  baseKey,
  id,
  onUpdated,
  disabled,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { query: updateStatus } = useMutate({
    url: [...baseKey, `${id}`, "status"],
    method: MutateRequestMethod.PATCH,
    options: {
      onError: (err) => {
        toast({
          variant: "destructive",
          title: t(`${get(err, "response.statusText", "Error")}`),
          description: t(
            `${get(
              err,
              "response.data.message",
              "An error occurred. Contact the administrator",
            )}`,
          ),
        });
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: t("Success"),
          description: t("Application updated successfully"),
        });
        onUpdated?.();
      },
    },
  });

  const canInteract = useMemo(
    () => !disabled && !updateStatus.isPending,
    [disabled, updateStatus.isPending],
  );

  const handleOpen = useCallback(() => {
    if (!canInteract) return;
    setOpen(true);
  }, [canInteract]);

  const handleSubmit = useCallback(
    (reason: string) => {
      if (!reason?.trim()) {
        toast({ variant: "destructive", title: t("Reason is required") });
        return;
      }
      updateStatus.mutate(
        { status: "reject", reason: reason.trim() },
        {
          onSuccess: () => {
            setOpen(false);
          },
        },
      );
    },
    [t, toast, updateStatus],
  );

  return (
    <>
      <MyTooltip content={t("Reject")}>
        <CircleX className={"size-4 cursor-pointer"} onClick={handleOpen} />
      </MyTooltip>
      <RejectReasonModal
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default RejectAction;
