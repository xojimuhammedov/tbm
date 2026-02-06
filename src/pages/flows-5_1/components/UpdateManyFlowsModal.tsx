import { useTranslation } from "react-i18next";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "dgz-ui/dialog";
import { Button } from "dgz-ui/button";
import useUpdateManyFlows from "@/pages/flows-5_1/hooks/useUpdateManyFlows";
import {Label} from "dgz-ui";
import {Input} from "dgz-ui/form";

interface UpdateManyFlowsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedIds: string[];
    onSuccess?: () => void;
}

const UpdateManyFlowsModal = ({
                                  open,
                                  onOpenChange,
                                  selectedIds,
                                  onSuccess,
                              }: UpdateManyFlowsModalProps) => {
    const { t } = useTranslation();

    const { form, onSubmit, handleClose, isLoading, isLoadingFlow } = useUpdateManyFlows({
        selectedIds,
        onSuccess,
        onClose: () => onOpenChange(false),
        isOpen: open,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {t("Update")} {selectedIds.length} {t("flows")}
                    </DialogTitle>
                </DialogHeader>

                {isLoadingFlow ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-sm text-muted-foreground">
                            {t("Loading flow data...")}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="additional_information">
                                {t("Additional Information")}
                            </Label>
                            <Input
                                id="additional_information"
                                {...register("additional_information")}
                                placeholder={t("Enter additional information")}
                            />
                            {errors.additional_information && (
                                <p className="text-sm text-destructive">
                                    {errors.additional_information.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reverse">{t("Reverse")}</Label>
                            <Input
                                id="reverse"
                                {...register("reverse")}
                                placeholder={t("Enter reverse")}
                            />
                            {errors.reverse && (
                                <p className="text-sm text-destructive">
                                    {errors.reverse.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="forward">{t("Forward")}</Label>
                            <Input
                                id="forward"
                                {...register("forward")}
                                placeholder={t("Enter forward")}
                            />
                            {errors.forward && (
                                <p className="text-sm text-destructive">
                                    {errors.forward.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sp">{t("SP")}</Label>
                            <Input
                                id="sp"
                                {...register("sp")}
                                placeholder={t("Enter SP")}
                            />
                            {errors.sp && (
                                <p className="text-sm text-destructive">{errors.sp.message}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="default"
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                {t("Cancel")}
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? t("Updating...") : t("Update all")}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UpdateManyFlowsModal;