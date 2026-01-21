import {
  Form,
  MyDatePicker,
  MyInput,
  MySelect,
} from "dgz-ui-shared/components/form";
import { useMemo } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui";
import { ArrowLeftIcon } from "lucide-react";
import DynamicIdInput from "./DynamicDeleteInput";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions";
import useApplicationDocumentForm from "@/pages/rh-252/a-252/hooks/useApplicationDocumentForm";
import UpdateFlowSection from "@/pages/rh-252/a-252/components/form/UpdateFlowSection.tsx";
import TvRvFlowSection from "@/pages/rh-252/a-252/components/form/TvRvFlowSection.tsx";
import CreateFlowSection from "@/pages/rh-252/a-252/components/form/ CreateFlowSection.tsx";
import AAGBackupDeleteSection from "@/pages/rh-252/a-252/components/form/ReserveChannelDeleteSection.tsx";
import { useNavigate } from "react-router-dom";

const ApplicationDocumentForm = () => {
  const { staffOptions } = useStaffOptions();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    form,
    handleSubmit,
    handleGenerate,
    setCurrentIds,
    getValidationClass,
    currentUpdateType,
  } = useApplicationDocumentForm({});

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "payload.create.flow_ids",
  });

  const {
    fields: updateFields,
    append: appendUpdate,
    remove: removeUpdate,
  } = useFieldArray({
    control: form.control,
    name: "payload.update.flow_ids",
  });

  const selectedCode = form.watch("code");
  const selectedActions = form.watch("payload.basic.actions") || [];
  const isTvRvMode = selectedCode === "17-54";
  const isNormalMode = selectedCode === "17-45";
  const isReserveChannelDeleteMode = selectedCode === "17-33";

  const handleAddUpdateRow = () => {
    if (currentUpdateType === "channels") {
      appendUpdate({ old: "", new: "" });
    } else {
      appendUpdate({
        code: "",
        point_a: "",
        point_b: "",
        device_a: "",
        device_b: "",
        port_a: "",
        port_b: "",
        signal_level: "",
      });
    }
  };

  const handleAddRow = () => {
    const stationA = form.watch("point_a");
    const stationB = form.watch("point_b");
    append({
      code: "",
      point_a: stationA || "",
      point_b: stationB || "",
      port_a: "",
      port_b: "",
      device_a: "",
      device_b: "",
      signal_level: "",
      id_exist: null,
    });
  };

  const handleGenerateClick = async () => {
    const rows = await handleGenerate();
    if (rows && rows.length > 0) {
      append(rows);
    }
  };

  const actionOptions = useMemo(
    () => [
      { label: "Tashkil etish", value: "create" },
      { label: "Ko'chirish", value: "update" },
      { label: "O'chirish", value: "delete" },
    ],
    [],
  );

  const prefixOptions = [
    { label: "17-54 (TV-RV)", value: "17-54" },
    { label: "17-45 (Flows)", value: "17-45" },
    { label: "17-33 (Flows)", value: "17-33" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} action="">
        <div className="p-8 bg-white shadow-lg text-black">
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

          <div className="flex justify-between items-center mb-8 text-lg">
            <div className="flex items-center gap-2">
              <span>SANA:</span>
              <MyDatePicker name="order_date" control={form.control} />
            </div>
            <div className="flex items-end gap-2">
              <div className="w-[150px]">
                <MySelect
                  name="code"
                  control={form.control}
                  options={prefixOptions}
                  placeholder="Kod"
                  className="border-t-0 border-l-0 border-r-0 rounded-none h-7 min-h-[28px]"
                />
              </div>
              <div className="w-[150px]">
                <MyInput
                  name="document_index"
                  control={form.control}
                  placeholder="Farmoyish nomeri"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />
              </div>
            </div>
            <div className="font-bold">SONI:1</div>
          </div>

          <div className="mb-8 text-lg">
            <p>
              <strong>Kimga:</strong>
            </p>
            <MyInput
              name="to"
              control={form.control}
              className="border border-t-0 border-l-0 border-r-0 rounded-none"
            />
          </div>

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

          {/* Form 17-45 ga xos bo'lgan qism */}
          {isNormalMode && (
            <>
              <div className="flex items-center justify-center gap-4 mb-8">
                <MyInput
                  control={form.control}
                  placeholder="Signal level"
                  name="payload.basic.signal_level"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />
                <p className="text-xl font-semibold">oqimlarni tarmoqdan</p>
                <div className="w-[380px] text-left">
                  <MySelect
                    control={form.control}
                    name="payload.basic.actions"
                    options={actionOptions}
                    placeholder={t("Tanlang...")}
                    isClearable
                    isMulti
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 my-8">
                <MyInput
                  control={form.control}
                  name="payload.basic.organization_name"
                  placeholder="O'zTTBRM DUK"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7 w-[300px]"
                />
                <p>mintaqaviy boshqaruv bog'lamasining</p>
                <div className="w-[120px]">
                  <MyDatePicker
                    name="payload.basic.request_date"
                    control={form.control}
                  />
                </div>
                <p>dagi va</p>
                <div className="w-[100px]">
                  <MyInput
                    name="payload.basic.request_number"
                    control={form.control}
                    placeholder="№"
                    className="border border-t-0 border-l-0 border-r-0 rounded-none h-6 py-0"
                  />
                </div>
                <p>-bildirgisiga binoan</p>
                <div className="w-[250px]">
                  <MyInput
                    name="payload.basic.justification"
                    control={form.control}
                    placeholder="Asoslash"
                    className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                  />
                </div>
                <div className="flex items-center gap-2 w-[150px] ml-auto">
                  <span>Deadline</span>
                  <MyDatePicker
                    name="payload.basic.deadline"
                    control={form.control}
                  />
                </div>
              </div>
            </>
          )}

          {/* Update section - faqat 17-45 uchun */}
          {isNormalMode && selectedActions.includes("update") && (
            <UpdateFlowSection
              control={form.control}
              fields={updateFields}
              currentUpdateType={currentUpdateType}
              onAddRow={handleAddUpdateRow}
              onRemoveRow={removeUpdate}
              getValidationClass={getValidationClass}
            />
          )}

          {/* Delete section - faqat 17-45 uchun */}
          {isNormalMode && selectedActions.includes("delete") && (
            <div className="mt-6 border p-4 my-2 rounded-xl">
              <h3 className="font-semibold mb-2">O'chirish</h3>
              <DynamicIdInput
                onIdsChange={(ids) => setCurrentIds(ids)}
                initialIds={[]}
              />
            </div>
          )}

          {/* Create section - faqat 17-45 uchun */}
          {isNormalMode && selectedActions.includes("create") && (
            <CreateFlowSection
              control={form.control}
              fields={fields}
              onAddRow={handleAddRow}
              onRemoveRow={remove}
              onGenerate={handleGenerateClick}
              watch={form.watch}
            />
          )}

          {/* Form 17-54 ga xos bo'lgan qism */}
          {isTvRvMode && (
            <TvRvFlowSection control={form.control} watch={form.watch} />
          )}
          {/* Form 17-33 ga xos bo'lgan qism */}
          {isReserveChannelDeleteMode && (
            <AAGBackupDeleteSection control={form.control} />
          )}
          <MySelect
            control={form.control}
            name="responsible"
            options={staffOptions || []}
            label={t("Mas'ul xodim")}
            placeholder={t("Select staffs")}
            isClearable
            required
          />
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
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default ApplicationDocumentForm;
