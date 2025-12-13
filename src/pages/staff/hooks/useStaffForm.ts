import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { STAFF_QUERY_KEY } from "@/pages/staff/constants/staff.constants.ts";
import { StaffInterface } from "@/pages/staff/interfaces/staff.interface.ts";
import {
  createStaffSchema,
  StaffDto,
} from "@/pages/staff/schemas/createStaffSchema.ts";

export type FormProps = {
  id: string | null;
  onSave?: () => void;
};

const useStaffForm = ({ id, onSave }: FormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createStaffSchema(t, id), [t, id]);
  const form = useForm<StaffDto>({
    resolver: zodResolver(schema),
  });

  const query = useGetOne<{ user: StaffInterface }>({
    url: [STAFF_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  const { query: save } = useMutate({
    url: [STAFF_QUERY_KEY, id || ""],
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
            ? t(`Staff updated successfully`)
            : t(`Staff created successfully`),
        });
      },
    },
  });

  useEffect(() => {
    const item = query.data?.user;
    if (item) {
      form.setValue("first_name", item.first_name);
      form.setValue("second_name", item.second_name);
      form.setValue("middle_name", item.middle_name);
      form.setValue("email", item.email);
      form.setValue("phone", item.phone);
      form.setValue("pinfl", item.pinfl);
      form.setValue("role", item.role._id);
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: StaffDto) => {
      const payload = { ...data };
      delete payload.passwordRepeat;
      save.mutate(payload);
    },
    [save],
  );

  return {
    form,
    onSubmit,
  };
};

export default useStaffForm;
