import { useState, useRef, useEffect } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { UploadCloudIcon, FileTextIcon, XIcon, Trash2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "dgz-ui/button";
import useExternalOutboundImport
  from "@/pages/in & out documents/17-97 external outbound document/hooks/useExternalOutboundImport.ts";

interface ImportFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch?: () => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const ImportExternalOutboundModal = ({
  open,
  onOpenChange,
  refetch,
}: ImportFlowModalProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);

  const { handleUpload, loading } = useExternalOutboundImport({
    onSuccess: () => {
      setProgress(100);
      setTimeout(() => {
        onOpenChange(false);
        setFiles([]);
        setProgress(0);
        refetch?.();
      }, 500);
    },
  });
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90;
          return prev + Math.random() * 10;
        });
      }, 500);
    } else if (!loading && progress !== 100) {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async () => {
    if (files.length === 0) return;
    handleUpload(files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles([e.target.files[0]]);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeFile = () => {
    setFiles([]);
  };

  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      className="sm:max-w-lg"
      header={
        <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <UploadCloudIcon className="size-5" />
          <span>{t("Import Flows")}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-4 sm:gap-6 p-1">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("Select File")}
          </label>

          <div
            className={`
                            border-2 border-dashed rounded-lg p-6 
                            flex flex-col items-center justify-center 
                            transition-colors cursor-pointer group
                            border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400
                            dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-800
                        `}
            onClick={() => inputRef.current?.click()}
          >
            <UploadCloudIcon className="size-8 mb-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">
              {files.length > 0
                ? t("Click to replace file")
                : t("Click to upload file")}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-center">
              {t("XLSX, XLS, CSV formats supported")}
            </p>

            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Selected File")}
              </span>
              <button
                onClick={removeFile}
                className="text-xs text-red-500 hover:text-red-600 hover:underline flex items-center gap-1 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2Icon className="size-3" /> {t("Clear")}
              </button>
            </div>

            <div className="border rounded-md p-2 bg-white border-gray-200 dark:bg-transparent dark:border-gray-800">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-2 rounded-md transition-all border bg-gray-50 border-gray-100 hover:border-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-800"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-1.5 rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <FileTextIcon className="size-4" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span
                        className="text-sm font-medium truncate text-gray-900 dark:text-gray-200 max-w-[200px]"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatBytes(file.size)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={removeFile}
                    className="p-1.5 rounded-full transition-colors text-gray-400 hover:text-red-500 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                    title={t("Remove file")}
                  >
                    <XIcon className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-2">
          <Button
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {t("Cancel")}
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading || files.length === 0}
            className="w-full sm:w-auto relative overflow-hidden transition-all"
          >
            <div
              className={`
                                absolute left-0 top-0 bottom-0 
                                bg-green-500/90 
                                transition-all duration-300 ease-out
                            `}
              style={{ width: `${progress}%` }}
            />

            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  {t("Uploading...")}
                  <span className="text-xs opacity-80">
                    ({Math.round(progress)}%)
                  </span>
                </>
              ) : (
                t("Upload")
              )}
            </span>
          </Button>
        </div>
      </div>
    </MyModal>
  );
};

export default ImportExternalOutboundModal;
