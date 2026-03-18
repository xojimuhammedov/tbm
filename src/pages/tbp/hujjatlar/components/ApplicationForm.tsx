import useGroupOptions from "@/pages/groups/hooks/useGroupOptions.ts";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import OrderForm1212 from "@/pages/tbp/hujjatlar/components/form/OrderForm1212.tsx";
import SettingsDocSection from "@/pages/tbp/hujjatlar/components/form/SettingsDocSection.tsx";
import TelegraphPlannedWorkSection from "@/pages/tbp/hujjatlar/components/form/TelegraphPlannedWorkSection.tsx";
import useApplicationDocumentForm from "@/pages/tbp/hujjatlar/hooks/useApplicationDocumentForm";
import { useFileUpload } from "@/pages/tbp/hujjatlar/hooks/useFileUpload.ts";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui";
import {
  Form,
  MyDatePicker,
  MyInput,
  MySelect,
} from "dgz-ui-shared/components/form";
import { ArrowLeftIcon, File, Loader2, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// ─── Shared file upload block (bir xil dizayn, hammaga umumiy) ───────────────

const FileUploadBlock = ({
  setValue,
}: {
  setValue: (name: string, value: any, opts?: object) => void;
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    { id: string; file_name: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleUpload, loading: isUploading } = useFileUpload((file_name) => {
    setValue("payload.file_name", file_name, { shouldValidate: true });
    setUploadedFiles([{ id: Date.now().toString(), file_name }]);
  });

  const handleRemoveFile = () => {
    setUploadedFiles([]);
    setValue("payload.file_name", "");
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300 mt-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700">
            Asos hujjat yuklash
          </span>

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
            size="sm"
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

        {uploadedFiles.length > 0 && (
          <div className="space-y-1">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <File className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700 truncate font-mono">
                    {file.file_name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main form ────────────────────────────────────────────────────────────────

const ApplicationDocumentForm = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { form, handleSubmit, isLoading } = useApplicationDocumentForm({
    id: id || null,
  });

  const { staffOptions } = useStaffOptions();
  const { groupOptions } = useGroupOptions();

  const selectedCode = form.watch("code");
  const isOrder1212Mode = selectedCode === "12-12";
  const isTelegraphPlannedWorkMode = selectedCode === "12-14";
  const isSettingsDocMode = selectedCode === "12-48";

  const prefixOptions = [
    { label: "12-12", value: "12-12" },
    { label: "12-14", value: "12-14" },
    { label: "12-48", value: "12-48" },
  ];

  if (isLoading && id) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="text-gray-600">{t("Loading...")}</span>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} action="">
        <div className="p-8 bg-white shadow-lg text-black">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs mb-2">
              IDRO.GOV.UZ tizimi orqali ЭРИ bilan tasdiqlangan, Xujjat kodi:
              XE03887284
            </p>
            <div className="flex justify-center items-center gap-8">
              <div className="text-6xl font-bold tracking-wider">TBM</div>
            </div>
            <p className="text-sm mt-4 italic">
              "O'zbekiston telekommunikatsiya tarmoqlarini boshqarish respublika
              markazi" davlat unitar korxonasi
            </p>
            <p className="text-xs text-gray-600 mt-2">
              "Republican telecommunications management center of Uzbekistan"
              government unitary enterprise
            </p>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold uppercase">Farmoyishi</h1>
          </div>

          {/* Sana / Kod / Nom-ra / Soni */}
          <div className="flex justify-between items-center mb-8 text-lg">
            <div className=" items-center gap-1 w-[150px]">
              <span className={"font-bold"}>Sana:</span>
              <MyDatePicker
                name="order_date"
                control={form.control}
                placeholder="Sana kiriting"
                rules={{ required: "Sana kiriting" }}
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="w-[150px]">
                <MySelect
                  name="code"
                  control={form.control}
                  options={prefixOptions}
                  placeholder="Kod"
                  className="border-t-0 border-l-0 border-r-0 rounded-none h-7 min-h-[28px]"
                  isDisabled={!!id}
                />
              </div>
            </div>
            <div className="font-bold">SONI:1</div>
          </div>

          {/* Kimga */}
          <div className="mb-8 text-lg">
            <p>
              <strong>Kimga:</strong>
            </p>
            <MySelect
              name="to"
              control={form.control}
              options={groupOptions || []}
              placeholder="Guruhlarni tanlang"
              isMulti
            />
          </div>

          {/* Nusxasi */}
          <div className="mb-8 text-lg">
            <p>
              <strong>Nusxasi:</strong>
            </p>
            <MyInput
              name="copy"
              control={form.control}
              className="border border-t-0 border-l-0 border-r-0 rounded-none"
            />
          </div>

          {/* Kimdan */}
          <div className="mb-8 text-lg">
            <p>
              <strong>Kimdan:</strong>
            </p>
            <MyInput
              name="from"
              control={form.control}
              className="border border-t-0 border-l-0 border-r-0 rounded-none"
            />
          </div>

          {/* Form 12-12 ga xos bo'lgan qism */}
          {isOrder1212Mode && (
            <OrderForm1212 control={form.control} watch={form.watch} />
          )}

          {/* Form 12-14 ga xos bo'lgan qism */}
          {isTelegraphPlannedWorkMode && (
            <TelegraphPlannedWorkSection control={form.control} />
          )}

          {/* Form 12-48 ga xos bo'lgan qism */}
          {isSettingsDocMode && (
            <SettingsDocSection
              control={form.control}
              staffOptions={staffOptions || []}
            />
          )}

          {/* ── Asos hujjat yuklash — hammasida eng pastda, bir xil ── */}
          <FileUploadBlock setValue={form.setValue} />

          {/* Imzolovchi */}
          <div className="mt-8 pt-6 border-t">
            <div className="max-w-md">
              <MySelect
                control={form.control}
                name="signer"
                options={staffOptions || []}
                label={t("Imzolovchi")}
                placeholder={t("Tanlang...")}
                isClearable
                required
              />
            </div>
          </div>
        </div>

        <FormContainerFooter>
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
            {t("Back")}
          </Button>
          <Button size="sm" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                {t("Saving...")}
              </>
            ) : (
              t(id ? "Update" : "Create")
            )}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default ApplicationDocumentForm;
