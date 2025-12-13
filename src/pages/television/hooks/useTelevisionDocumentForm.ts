import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  createTelevisionSchema,
  TelevisionDto,
} from "@/pages/television/schemas/createTelevisionSchema.ts";
import { TELEVISION_QUERY_KEY } from "@/pages/television/constants/television.constants.ts";
import useTelevisionDocument from "@/pages/television/hooks/useTelevisionDocument.ts";

export interface UseTelevisionDocumentFormParams {
  id?: string | null;
  onSave?: () => void;
}

const useTelevisionDocumentForm = ({
  id,
  onSave,
}: UseTelevisionDocumentFormParams) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { televisionDocumentQuery } = useTelevisionDocument(id as string);

  const form = useForm<TelevisionDto>({
    resolver: zodResolver(createTelevisionSchema(t)),
    defaultValues: {
      title: "",
      files: [],
      recipientIds: [],
      chairman: "",
      director: "",
      text1: "",
      text2: "",
      speed: "",
      documents: [
        { address: "", speed_and_type: "", date: "", duration: "", type: "" },
      ],
    },
    mode: "onChange",
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  useEffect(() => {
    const item = televisionDocumentQuery.data?.data;
    if (item) {
      form.setValue("title", item.title);
      form.setValue("description", item.description ?? "");
      form.setValue("chairman", item.chairman ?? "");
      form.setValue("director", item.director ?? "");
      form.setValue("text1", item.text1 ?? "");
      form.setValue("text2", item.text2 ?? "");
      form.setValue("speed", item.speed ?? "");
      form.setValue("documents", item.documents as TelevisionDto["documents"]);
      form.setValue("files", (item.files ?? []) as [string, ...string[]]);
      const ids = item.recipientIds?.map((p) => p._id) ?? [];
      form.setValue(
        "recipientIds",
        (ids.length > 0 ? ids : [""]) as [string, ...string[]],
      );
    }
  }, [televisionDocumentQuery.data, form]);

  const addNewRow = useCallback(() => {
    append({
      address: "",
      speed_and_type: "",
      date: "",
      duration: "",
      type: "",
    });
  }, [append]);

  const removeRow = useCallback(
    (index: number) => {
      if (fields.length > 1) {
        remove(index);
      }
    },
    [fields.length, remove],
  );

  const updateRow = useCallback(
    (
      index: number,
      field: keyof TelevisionDto["documents"][number],
      value: string,
    ) => {
      const current = fields[
        index
      ] as unknown as TelevisionDto["documents"][number];
      update(index, { ...current, [field]: value });
    },
    [fields, update],
  );

  const { query: save } = useMutate({
    url: [TELEVISION_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(`${get(error, "response.statusText", "Error")}`),
          description: t(
            `${get(
              error,
              "response.data.message",
              "An error occurred. Contact the administrator",
            )}`,
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
            ? t(`Television document updated successfully`)
            : t(`Television document created successfully`),
        });
      },
    },
  });

  const handleSubmit = useCallback(
    (values: TelevisionDto) => {
      save.mutate(values);
    },
    [save],
  );

  return {
    form,
    fields,
    addNewRow,
    removeRow,
    updateRow,
    handleSubmit,
  };
};

export default useTelevisionDocumentForm;
