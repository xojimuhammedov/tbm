import React, { useCallback, useMemo } from "react";
import { CircleCheck } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { useTranslation } from "react-i18next";
import { useConfirm } from "dgz-ui-shared/hooks";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";

type Url = string | number;

type AcceptActionProps = {
  baseKey: Url[];
  id: Url;
  onUpdated?: () => void;
  disabled?: boolean;
};

const AcceptAction: React.FC<AcceptActionProps> = ({
  baseKey,
  id,
  onUpdated,
  disabled,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { confirm } = useConfirm();

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

  const handleAccept = useCallback(() => {
    if (!canInteract) return;
    confirm({
      onConfirm: () => updateStatus.mutate({ status: "confirm" }),
    });
  }, [canInteract, confirm, t, toast, updateStatus]);

  return (
    <MyTooltip content={t("Accept")}>
      <CircleCheck className={"size-4 cursor-pointer"} onClick={handleAccept} />
    </MyTooltip>
  );
};

export default AcceptAction;
