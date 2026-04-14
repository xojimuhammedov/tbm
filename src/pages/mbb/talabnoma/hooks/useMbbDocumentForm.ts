import { useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  createMbbDocumentSchema,
  MbbDocumentDto,
} from "@/pages/mbb/talabnoma/schemas/createMbbDocumentSchema.ts";
import URLS from "@/shared/constants/urls.ts";

export interface MbbDocumentFormProps {
  id?: string | null;
  onSave?: () => void;
}

const useMbbDocumentForm = ({ id, onSave }: MbbDocumentFormProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<MbbDocumentDto>({
    resolver: zodResolver(createMbbDocumentSchema(t)),
    mode: "onChange",
    defaultValues: {
      document_type: "REQUISITION",
      code: "",
      signer: "",
      // REQUISITION defaults
      working_condition: "",
      schedule: [{ start_at: "", end_at: "" }],
      station: "",
      no_number: "",
      ai_channel: "",
      reason_work: "",
      content_work: "",
      no_status: "",
      aoj_number: "",
      reverse: "",
      responsible_person: "",
      agreed: "",
      ai_agreed: "",
      creator_ip: "",
      creator_mbb: "",
      application: [
        {
          operator_name: "",
          ranges: [{ from: "", to: "" }],
        },
      ],
      // MEMO defaults
      title: "",
      data: [
        {
          order_code: "",
          assigned_time: "",
          completed_time: "",
          responsible_executor: "",
          customer_details: "",
          comment: "",
        },
      ],
    },
  });

  const documentType = form.watch("document_type");

  // REQUISITION field arrays
  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  const {
    fields: applicationFields,
    append: appendApplication,
    remove: removeApplication,
  } = useFieldArray({
    control: form.control,
    name: "application",
  });

  // MEMO field arrays
  const {
    fields: dataFields,
    append: appendData,
    remove: removeData,
  } = useFieldArray({
    control: form.control,
    name: "data",
  });

  const { query: save } = useMutate({
    url: [URLS.MBB_Document, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onSuccess: () => {
        if (!id) form.reset();
        toast({
          variant: "success",
          title: t("Success"),
          description: id
            ? t("Application updated successfully")
            : t("Application created successfully"),
        });
        onSave?.();
        navigate("/mbb/rh-3_3");
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast({
          variant: "destructive",
          title: t(`${get(axiosError, "response.statusText", "Error")}`),
          description: t(
            `${get(axiosError, "response.data.message", "An error occurred")}`,
          ),
        });
      },
    },
  });

  const onSubmit = useCallback(
    (values: MbbDocumentDto) => {
      const { document_type, code, signer, ...rest } = values;

      let payload: Record<string, unknown>;

      if (document_type === "REQUISITION") {
        // Build REQUISITION payload
        const {
          working_condition,
          schedule,
          station,
          no_number,
          ai_channel,
          reason_work,
          content_work,
          no_status,
          aoj_number,
          reverse,
          responsible_person,
          agreed,
          ai_agreed,
          creator_ip,
          creator_mbb,
          application,
        } = rest;

        payload = {
          working_condition,
          schedule,
          station,
          no_number,
          ai_channel,
          reason_work,
          content_work,
          no_status,
          aoj_number,
          reverse,
          responsible_person,
          agreed,
          ai_agreed,
          creator_ip,
          creator_mbb,
          application,
        };
      } else {
        // Build MEMO payload
        const { title, data: memoData } = rest;
        payload = {
          title,
          data: memoData?.map((item) => ({
            ...item,
            assigned_time: item.assigned_time,
            completed_time: item.completed_time,
          })),
        };
      }

      const body = {
        code,
        document_type,
        payload,
        signer,
      };

      save.mutate(body);
    },
    [save],
  );

  // MEMO helpers
  const handleAppendData = useCallback(() => {
    appendData({
      order_code: "",
      assigned_time: "",
      completed_time: "",
      responsible_executor: "",
      customer_details: "",
      comment: "",
    });
  }, [appendData]);

  const handleRemoveData = useCallback(
    (index: number) => {
      if (dataFields.length > 1) {
        removeData(index);
      }
    },
    [removeData, dataFields.length],
  );

  return {
    form,
    documentType,
    // REQUISITION
    scheduleFields,
    applicationFields,
    appendSchedule,
    removeSchedule,
    appendApplication,
    removeApplication,
    // MEMO
    dataFields,
    handleAppendData,
    handleRemoveData,
    // Common
    isLoading: save.isPending,
    onSubmit,
  };
};

export default useMbbDocumentForm;
