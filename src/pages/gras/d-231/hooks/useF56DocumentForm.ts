import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  createF56Schema,
  F56Dto,
} from "@/pages/rtsi/f-56/schemas/createF56Schema.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { get } from "lodash";
import { F56_QUERY_KEY } from "@/pages/rtsi/f-56/constants/f56.constants.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import useF56Document from "@/pages/rtsi/f-56/hooks/useF56Document.ts";

export interface UseF56DocumentFormParams {
  id?: string | null;
  onSave?: () => void;
  allF51Ids?: string[];
}

const useF56DocumentForm = ({
  id,
  onSave,
  allF51Ids = [],
}: UseF56DocumentFormParams) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { f56DocumentQuery } = useF56Document(id as string);

  const form = useForm<F56Dto>({
    resolver: zodResolver(createF56Schema(t)),
    defaultValues: {
      recipientIds: [""],
      description: "",
      f51_ids: [],
    },
  });

  useEffect(() => {
    const item = f56DocumentQuery.data?.data;
    if (item) {
      // Basic fields
      form.setValue("description", item.description);
      const ids = item.recipientIds?.map((p) => p._id) ?? [];
      form.setValue(
        "recipientIds",
        (ids.length > 0 ? ids : [""]) as [string, ...string[]],
      );

      // Normalize f51_ids coming from backend to always be string[] of IDs
      const raw = (get(
        item as unknown as Record<string, unknown>,
        "f51_ids",
        [],
      ) || []) as unknown[];

      const normalized = raw
        .map((v) => {
          if (v == null) return null;
          if (typeof v === "string") return v;
          if (typeof v === "number") return String(v);
          if (typeof v === "object") {
            const maybeId = get(v as Record<string, unknown>, "_id");
            if (typeof maybeId === "string" || typeof maybeId === "number") {
              return String(maybeId);
            }
          }
          return null;
        })
        .filter((v): v is string => Boolean(v));

      form.setValue("f51_ids", normalized, {
        shouldDirty: false,
        shouldValidate: false,
      });
    }
  }, [f56DocumentQuery.data, form]);

  const { query: save } = useMutate({
    url: [F56_QUERY_KEY, id || ""],
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
            ? t(`F56 updated successfully`)
            : t(`F56 created successfully`),
        });
      },
    },
  });

  const handleSubmit = useCallback(
    (values: F56Dto) => {
      save.mutate(values);
    },
    [save],
  );

  const selectedF51Ids = form.watch("f51_ids") || [];
  const allSelected =
    (allF51Ids?.length ?? 0) > 0 &&
    allF51Ids.every((id) => selectedF51Ids.includes(id));

  const toggleAllF51 = () => {
    form.setValue("f51_ids", allSelected ? [] : allF51Ids, {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const toggleF51 = (id: string) => {
    const set = new Set<string>(selectedF51Ids);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    form.setValue("f51_ids", Array.from(set), {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  return {
    form,
    handleSubmit,
    selectedF51Ids,
    allSelected,
    toggleAllF51,
    toggleF51,
  };
};

export default useF56DocumentForm;
