import { Control, UseFormSetValue } from "react-hook-form";
import { MyInput } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui";
import { Plus, Loader2, UploadCloud, File, X } from "lucide-react";
import { useRef, useState } from "react";
import { useFileUpload } from "@/pages/rh-252/a-252/hooks/useFileUpload.ts";
import { OrderApplication } from "@/pages/rh-252/a-252/interfaces/order.interface.ts";

interface IDSection1731Props {
  control: Control<OrderApplication>;
  setValue: UseFormSetValue<OrderApplication>;
}

interface UploadedFile {
  id: string;
  file_name: string;
  uploadedAt: Date;
}

const IDSection1731 = ({ control, setValue }: IDSection1731Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleUpload, loading: isUploading } = useFileUpload((file_name) => {
    console.log("onSuccessAction callback called with file_name:", file_name); // Debug
    setValue("payload.file_name", file_name, { shouldValidate: true });
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      file_name: file_name,
      uploadedAt: new Date(),
    };
    setUploadedFiles((prev) => {
      const updated = [...prev, newFile];
      return updated;
    });
  });

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    const remainingFiles = uploadedFiles.filter((file) => file.id !== fileId);
    if (remainingFiles.length === 0) {
      setValue("payload.file_name", "", { shouldValidate: true });
    } else {
      setValue(
        "payload.file_name",
        remainingFiles[remainingFiles.length - 1].file_name,
        { shouldValidate: true },
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <UploadCloud className="w-5 h-5 text-blue-500" />
              <span>Hujjat yuklash</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                handleUpload(e);
                e.target.value = "";
              }}
            />

            <Button
              type="button"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-white"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Fayl tanlash
            </Button>
          </div>

          <div className="relative">
            <MyInput
              control={control}
              name="payload.file_name"
              placeholder="Fayl nomi avtomatik yuklanadi..."
              readOnly
              className="bg-gray-100 border-gray-200 cursor-not-allowed font-mono text-xs"
            />
            {isUploading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              </div>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-2 space-y-2">
              <p className="text-xs font-semibold text-gray-600">
                Yuklangan fayllar:
              </p>
              <div className="space-y-1">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <File className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate font-mono">
                        {file.file_name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                      title="Faylni o'chirish"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IDSection1731;
