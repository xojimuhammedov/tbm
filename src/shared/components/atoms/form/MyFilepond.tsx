import {
  FilepondContainer,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
} from "dgz-ui-shared/components/form";
import { type FilePondFile, registerPlugin } from "filepond";
import type { FieldPath, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { get, isArray } from "lodash";
import { cn } from "dgz-ui";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePond, FilePondProps } from "react-filepond";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
);

export type MyFilepondProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    FilePondProps & {
      onChange?: (files: FilePondFile[]) => void;
      containerClassName?: string;
      beforeRemoveFile?: (file: unknown) => void;
        helperText?: React.ReactNode;
        floatingError?: boolean;
    };

const MyFilepond = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  className,
  floatingError,
  maxFiles = 1,
  maxFileSize = "10MB",
  onChange,
  rules,
  beforeRemoveFile,
  ...props
}: MyFilepondProps<TFieldValues>) => {
  const labelElm = label && (
    <FormLabel className={"text-body-xs-medium my-3"}>
      {label} {required && <span className={"text-red-600"}>*</span>}
    </FormLabel>
  );

  return name && control ? (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState }) => (
        <FormItem>
          {labelElm}
          <FormControl>
            <FilepondContainer
              variant={get(formState.errors, `${name}`) ? "failure" : "default"}
            >
              <FilePond
                credits={false}
                files={
                  field.value
                    ? isArray(field.value)
                      ? field.value
                      : [field.value]
                    : []
                }
                name={field.name}
                {...props}
                className={twMerge(["mt-2 mb-0 rounded-xl", className])}
                onupdatefiles={(files = []) => {
                  if (maxFiles && maxFiles > 1) {
                    field.onChange(
                      files.map((file) => get(file, "source") as File | string),
                    );
                  } else {
                    field.onChange(get(files, "[0].source", undefined));
                  }
                  if (onChange) {
                    onChange(files);
                  }
                }}
                beforeRemoveFile={(item: FilePondFile) => {
                  if (beforeRemoveFile) {
                    beforeRemoveFile(item.source);
                  }
                  return true;
                }}
                maxFileSize={maxFileSize}
                maxFiles={maxFiles}
                {...props}
              />
            </FilepondContainer>
          </FormControl>
          <FormDescription>{helperText}</FormDescription>
          <FormMessage className={cn(floatingError && "absolute")} />
        </FormItem>
      )}
    />
  ) : (
    <>
      {labelElm}
      <FilepondContainer>
        <FilePond
          credits={false}
          {...props}
          maxFiles={maxFiles}
          maxFileSize={maxFileSize}
          onupdatefiles={onChange}
          beforeRemoveFile={beforeRemoveFile}
          className={twMerge(["mt-2 mb-0 rounded-xl", className])}
        />
      </FilepondContainer>
    </>
  );
};

export default MyFilepond;
