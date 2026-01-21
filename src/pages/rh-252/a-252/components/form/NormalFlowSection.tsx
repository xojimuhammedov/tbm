import { MyDatePicker, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { Control, UseFormWatch } from "react-hook-form";
import { useMemo } from "react";
import UpdateFlowSection from "@/pages/rh-252/a-252/components/form/UpdateFlowSection.tsx";
import DynamicIdInput from "@/pages/rh-252/a-252/components/DynamicDeleteInput.tsx";
import CreateFlowSection from "@/pages/rh-252/a-252/components/form/ CreateFlowSection.tsx";

interface NormalFlowSectionProps {
  control: Control<any>;
  watch: UseFormWatch<any>;
  updateFields: any[];
  fields: any[];
  currentUpdateType: string;
  onAddUpdateRow: () => void;
  onRemoveUpdate: (index: number) => void;
  onAddRow: () => void;
  onRemove: (index: number) => void;
  onGenerate: () => Promise<void>;
  setCurrentIds: (ids: any[]) => void;
  getValidationClass: (index: number, field: string) => string;
}

const NormalFlowSection = ({
  control,
  watch,
  updateFields,
  fields,
  currentUpdateType,
  onAddUpdateRow,
  onRemoveUpdate,
  onAddRow,
  onRemove,
  onGenerate,
  setCurrentIds,
  getValidationClass,
}: NormalFlowSectionProps) => {
  const { t } = useTranslation();

  const actionOptions = useMemo(
    () => [
      { label: "Tashkil etish", value: "create" },
      { label: "Ko'chirish", value: "update" },
      { label: "O'chirish", value: "delete" },
    ],
    [],
  );

  const selectedActions = watch("payload.basic.actions") || [];

  return (
    <>
      {/* Basic section */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <MyInput
          control={control}
          placeholder="Signal level"
          name="payload.basic.signal_level"
          className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
        />
        <p className="text-xl font-semibold">oqimlarni tarmoqdan</p>
        <div className="w-[380px] text-left">
          <MySelect
            control={control}
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
          control={control}
          name="payload.basic.organization_name"
          placeholder="O'zTTBRM DUK"
          className="border border-t-0 border-l-0 border-r-0 rounded-none h-7 w-[300px]"
        />
        <p>mintaqaviy boshqaruv bog'lamasining</p>
        <div className="w-[120px]">
          <MyDatePicker name="payload.basic.request_date" control={control} />
        </div>
        <p>dagi va</p>
        <div className="w-[100px]">
          <MyInput
            name="payload.basic.request_number"
            control={control}
            placeholder="№"
            className="border border-t-0 border-l-0 border-r-0 rounded-none h-6 py-0"
          />
        </div>
        <p>-bildirgisiga binoan</p>
        <div className="w-[250px]">
          <MyInput
            name="payload.basic.justification"
            control={control}
            placeholder="Asoslash"
            className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
          />
        </div>
        <div className="flex items-center gap-2 w-[150px] ml-auto">
          <span>Deadline</span>
          <MyDatePicker name="payload.basic.deadline" control={control} />
        </div>
      </div>

      {/* Update section */}
      {selectedActions.includes("update") && (
        <UpdateFlowSection
          control={control}
          fields={updateFields}
          currentUpdateType={currentUpdateType}
          onAddRow={onAddUpdateRow}
          onRemoveRow={onRemoveUpdate}
          getValidationClass={getValidationClass}
        />
      )}

      {selectedActions.includes("delete") && (
        <div className="mt-6 border p-4 my-2 rounded-xl">
          <h3 className="font-semibold mb-2">O'chirish</h3>
          <DynamicIdInput
            onIdsChange={(ids) => setCurrentIds(ids)}
            initialIds={[]}
          />
        </div>
      )}

      {selectedActions.includes("create") && (
        <CreateFlowSection
          control={control}
          fields={fields}
          onAddRow={onAddRow}
          onRemoveRow={onRemove}
          onGenerate={onGenerate}
          watch={watch}
        />
      )}
    </>
  );
};

export default NormalFlowSection;
