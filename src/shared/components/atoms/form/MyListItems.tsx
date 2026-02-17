import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormItemProps,
  FormLabel,
  FormMessage,
} from "dgz-ui-shared/components/form";
import { FieldPath, FieldValues } from "react-hook-form";
import { ReactNode } from "react";
import { MyTable, MyTableProps } from "dgz-ui-shared/components/datatable";
import { DEFAULT_LIMIT } from "@/shared/constants/page.constants.ts";
import { cn } from "dgz-ui";
import { MyPagination } from "dgz-ui-shared/components/pagination";

type MyListItemsProps<
  TFieldValues extends FieldValues,
  TData,
> = FormItemProps<TFieldValues> &
  MyTableProps<TData> & {
    required: boolean;
    className?: string;
    onParamsChange?: (params: Record<string, unknown>) => void;
    total?: number;
    header?: ReactNode;
    helperText?: ReactNode;
  };

const MyListItems = <TFieldValues extends FieldValues, TData>({
  control,
  name,
  label,
  helperText,
  required,
  className,
  total = 0,
  params,
  onParamsChange,
  floatingError,
  header,
  rules,
  ...props
}: MyListItemsProps<TFieldValues, TData>) => {
  const labelElm = label && (
    <FormLabel className={"my-3"}>
      {label} {required && <span className={"text-red-600"}>*</span>}
    </FormLabel>
  );

  return name && control ? (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          {labelElm}
          {header && header}
          <FormControl className={"mt-2"}>
            <MyTable<TData>
              {...props}
              params={params}
              selectedItems={field.value}
              onSelectedItemsChange={field.onChange}
            />
          </FormControl>
          <MyPagination
            onPageChange={(page) => {
              onParamsChange?.({ ...params, page });
            }}
            currentPage={Number(params?.page || 1)}
            totalPages={Math.ceil(
              total / Number(params?.limit || DEFAULT_LIMIT),
            )}
          />
          <FormDescription>{helperText}</FormDescription>
          <FormMessage className={cn(floatingError && "absolute")} />
        </FormItem>
      )}
    />
  ) : (
    <>
      {labelElm}
      <MyTable<TData> {...props} />
      <FormDescription>{helperText}</FormDescription>
    </>
  );
};

export default MyListItems;
