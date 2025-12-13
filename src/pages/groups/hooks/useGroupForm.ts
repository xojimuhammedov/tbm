import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { STAFF_QUERY_KEY } from "@/pages/staff/constants/staff.constants.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { StaffInterface } from "@/pages/staff/interfaces/staff.interface.ts";
import {
  createGroupSchema,
  GroupDto,
} from "@/pages/groups/schemas/createGroupSchema.ts";
import { GROUPS_QUERY_KEY } from "@/pages/groups/constants/groups.constants.ts";
import { GroupInterface } from "@/pages/groups/interfaces/group.interface.ts";

export type GroupFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useGroupForm = ({ id, onSave }: GroupFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createGroupSchema(t), [t]);
  const form = useForm<GroupDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      users: [],
    },
  });

  const {
    query: staffQuery,
    handleFilter: handleStaffFilter,
    params: staffParams,
  } = useLists<StaffInterface>({
    url: [STAFF_QUERY_KEY],
  });

  const groupQuery = useGetOne<GroupInterface>({
    url: [GROUPS_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  const { query: save } = useMutate({
    url: [GROUPS_QUERY_KEY, id || ""],
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
            ? t(`Group updated successfully`)
            : t(`Group created successfully`),
        });
      },
    },
  });

  useEffect(() => {
    const data = groupQuery.data;
    if (data) {
      form.setValue("name", data.name);
      form.setValue("description", data.description);
      form.setValue(
        "users",
        (data.users || []).map((user) => user._id),
      );
    }
  }, [groupQuery.data, form]);

  const onSubmit = useCallback(
    (data: GroupDto) => {
      save.mutate(data);
    },
    [save],
  );

  return {
    form,
    onSubmit,
    staffList: staffQuery.data?.docs || [],
    staffTotal: staffQuery.data?.total || 0,
    staffLoading: staffQuery.isLoading,
    staffParams,
    handleStaffFilter,
    groupUsers: groupQuery.data?.users || [],
  };
};

export default useGroupForm;
