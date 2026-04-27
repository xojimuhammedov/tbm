import { Control, useController } from "react-hook-form";
import { Loader2, UploadCloud, File, X } from "lucide-react";
import { useRef } from "react";
import { useFileUpload } from "@/pages/rh-252/a-252/hooks/useFileUpload.ts";

interface FileUploaderCellProps {
  control: Control<any>;
  name: string;
}

export const FileUploaderCell = ({ control, name }: FileUploaderCellProps) => {
  const { field } = useController({
    control,
    name,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleUpload, loading: isUploading } = useFileUpload((file_name) => {
    field.onChange(file_name);
  });

  const handleRemoveFile = () => {
    field.onChange("");
  };

  const hasFile = !!field.value;

  return (
    <div className="flex items-center justify-center">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          handleUpload(e);
          e.target.value = "";
        }}
      />

      {isUploading ? (
        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
      ) : hasFile ? (
        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700 border border-green-200">
          <File className="w-4 h-4" />
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700 ml-1"
            title="O'chirish"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
          title="Fayl yuklash"
        >
          <UploadCloud className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
