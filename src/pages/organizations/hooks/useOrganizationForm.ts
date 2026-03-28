import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { ORG_QUERY_KEY } from "@/pages/organizations/constants/org.constants.ts";
import {
  createStaffSchema,
  StaffDto,
} from "@/pages/organizations/schemas/createOrgSchema.ts";

export type FormProps = {
  id: string | null;
  onSave?: () => void;
};

const useOrganizationForm = ({ id, onSave }: FormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createStaffSchema(t, id), [t, id]);
  const form = useForm<StaffDto>({
    resolver: zodResolver(schema),
  });

  const query = useGetOne<any>({
    url: [ORG_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  const { query: save } = useMutate({
    url: [ORG_QUERY_KEY, id || ""],
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
            ? t(`Organization updated successfully`)
            : t(`Organization created successfully`),
        });
      },
    },
  });

  useEffect(() => {
    // API response shape may vary; support common keys.
    const item =
      query.data?.organization ??
      query.data?.organizations ??
      query.data?.org ??
      query.data?.user ??
      query.data;

    if (item?.name !== undefined) {
      form.setValue("name", item.name ?? "");
      form.setValue("description", item.description ?? "");
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: StaffDto) => {
      save.mutate({ ...data });
    },
    [save],
  );

  return {
    form,
    onSubmit,
  };
};

export default useOrganizationForm;
