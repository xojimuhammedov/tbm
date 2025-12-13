import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  createApplicationSchema,
  ApplicationDto,
} from "@/pages/rtsi/application/schemas/createApplicationSchema.ts";
import { APPLICATION_QUERY_KEY } from "@/pages/rtsi/application/constants/application.constants.ts";
import useApplicationDocument from "@/pages/rtsi/application/hooks/useApplicationDocument.ts";

export interface UseApplicationDocumentFormParams {
  id?: string | null;
  onSave?: () => void;
}

const useApplicationDocumentForm = ({
  id,
  onSave,
}: UseApplicationDocumentFormParams) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { applicationDocumentQuery } = useApplicationDocument(id as string);

  const form = useForm<ApplicationDto>({
    resolver: zodResolver(createApplicationSchema(t)),
    mode: "onChange",
  });

  useEffect(() => {
    const item = applicationDocumentQuery.data?.data;
    if (item) {
      form.setValue("applicationNumber", item.applicationNumber);
      form.setValue("workProcedure", item.workProcedure);
      form.setValue("workProcedure", item.workProcedure);
      form.setValue("workDateTime", item.workDateTime);
      form.setValue("station", item.station);
      form.setValue("noNumber", item.noNumber);
      form.setValue("aiChannels", item.aiChannels);
      form.setValue("workReason", item.workReason);
      form.setValue("workDescription", item.workDescription);
      form.setValue("koStatus", item.koStatus);
      form.setValue("bypassSchedule", item.bypassSchedule);
      form.setValue("alternativeBackup", item.alternativeBackup);
      form.setValue("responsiblePerson", item.responsiblePerson);
      form.setValue(
        "approvedByTechnicalDirector",
        item.approvedByTechnicalDirector,
      );
      form.setValue("approvedByLocalAI", item.approvedByLocalAI);
      form.setValue("orderAP", item.orderAP);
      form.setValue("orderMBB", item.orderMBB);
      const ids = item.recipientIds?.map((p) => p._id) ?? [];
      form.setValue(
        "recipientIds",
        (ids.length > 0 ? ids : [""]) as [string, ...string[]],
      );
    }
  }, [applicationDocumentQuery.data, form]);

  const { query: save } = useMutate({
    url: [APPLICATION_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(`${get(error, "response.statusText", "Error")}`),
          description: t(
            `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
          ),
        });
      },
      onSuccess: () => {
        form.reset();
        onSave?.();
        toast({
          variant: "success",
          title: t(`Success`),
          description: id
            ? t(`Application updated successfully`)
            : t(`Application created successfully`),
        });
      },
    },
  });

  const handleSubmit = useCallback(
    (values: ApplicationDto) => {
      save.mutate(values);
    },
    [save],
  );

  return {
    id,
    form,
    handleSubmit,
  };
};

export default useApplicationDocumentForm;
