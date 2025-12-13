import { memo, useMemo } from "react";
import { FilePond, FilePondProps } from "react-filepond";
import { useUpload } from "@/shared/hooks/useUpload";
import { useTranslation } from "react-i18next";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { registerPlugin } from "react-filepond";
import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css";
import "filepond/dist/filepond.min.css";
import "dgz-ui-shared/dist/dgz-ui-shared.css";
import "dgz-ui/dist/dgz-ui.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
);

type Props<T = unknown> = Partial<FilePondProps> & {
  onFinishUpload?: (response: T) => void;
  docType?: string; // optional document type to send as metadata "type"
};

const FilePondComponent = <T,>({
  allowFileTypeValidation = true,
  acceptedFileTypes = ["image/*", "video/*", "audio/*"],
  allowFileSizeValidation = true,
  server,
  name = "file",
  maxFiles = 10,
  allowMultiple = true,
  instantUpload = undefined,
  onFinishUpload,
  credits = false,
  docType,
  ...props
}: Props<T>) => {
  const { t } = useTranslation();
  const { uploadServer } = useUpload(onFinishUpload);

  const serverConfig = useMemo<FilePondProps["server"]>(() => {
    const baseServer = server || uploadServer;

    if (!docType) return baseServer;

    if (
      baseServer &&
      typeof baseServer === "object" &&
      "process" in baseServer
    ) {
      const baseProcess = baseServer.process;
      if (typeof baseProcess === "function") {
        return {
          ...(baseServer as object),
          process: (
            fieldName: string,
            file: unknown,
            metadata: unknown,
            load: unknown,
            error: unknown,
            progress: unknown,
            abort?: unknown,
          ) => {
            const extendedMeta = {
              ...(typeof metadata === "object" && metadata
                ? (metadata as Record<string, unknown>)
                : {}),
              type: docType,
            } as Record<string, unknown>;
            // @ts-expect-error unkown type
            return baseProcess(
              fieldName,
              file,
              extendedMeta,
              load,
              error,
              progress,
              abort,
            );
          },
        } as FilePondProps["server"];
      }
    }

    return baseServer;
  }, [server, uploadServer, docType]);

  return (
    <FilePond
      allowFileTypeValidation={allowFileTypeValidation}
      acceptedFileTypes={acceptedFileTypes}
      allowFileSizeValidation={allowFileSizeValidation}
      server={serverConfig}
      name={name}
      maxFiles={maxFiles}
      allowMultiple={allowMultiple}
      instantUpload={instantUpload}
      credits={credits}
      labelIdle={`${t("Drag & Drop your images here or")} <span class="filepond--label-action">${t("Browse")}</span>`}
      {...props}
    />
  );
};

export default memo(FilePondComponent) as typeof FilePondComponent;
