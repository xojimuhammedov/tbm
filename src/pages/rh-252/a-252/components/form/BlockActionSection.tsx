import { Control, useFieldArray, useWatch } from "react-hook-form";
import { MyInput, MyDatePicker, MySelect } from "dgz-ui-shared/components/form";
import { Button, cn } from "dgz-ui";
import { Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { request } from "@/request";

interface BlockActionSectionProps {
  control: Control<any>;
}

interface ValidationStates {
  [key: string]: boolean;
}

const BlockActionSection = ({ control }: BlockActionSectionProps) => {
  const [validationStates, setValidationStates] = useState<ValidationStates>(
    {},
  );

  const directionOptions = [
    { label: "Global", value: "global" },
    { label: "Local", value: "local" },
  ];

  const actionTypeOptions = [
    { label: "Block", value: "block" },
    { label: "Unblock", value: "unblock" },
  ];

  const selectionTypeOptions = [
    { label: "Kanallar (Channels)", value: "channels" },
    { label: "Oqimlar (Flows)", value: "flows" },
  ];

  const currentSelectionType = useWatch({
    control,
    name: "payload.basic.selection_type",
    defaultValue: "channels",
  });

  const {
    fields: flowFields,
    append: appendFlow,
    remove: removeFlow,
  } = useFieldArray({
    control,
    name: "payload.flow_ids" as never,
  });

  const {
    fields: channelFields,
    append: appendChannel,
    remove: removeChannel,
  } = useFieldArray({
    control,
    name: "payload.channels" as never,
  });

  const watchedFlows = useWatch({
    control,
    name: "payload.flow_ids",
  });

  const watchedChannels = useWatch({
    control,
    name: "payload.channels",
  });

  const checkValidation = async (value: string, key: string) => {
    if (!value || value.trim() === "") {
      setValidationStates((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      return;
    }

    try {
      // using isEmpty=false for generic check based on UpdateFlowSection.tsx format
      const res = await request.get(
        `/api/rh-252/order/check?idOrChannel=${encodeURIComponent(value)}&isEmpty=false`,
      );
      const isValid = res.data?.success === true || res.data?.valid !== false;

      setValidationStates((prev) => ({
        ...prev,
        [key]: isValid,
      }));
    } catch (error) {
      setValidationStates((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  const debouncedCheck = useRef(
    debounce((value: string, key: string) => {
      checkValidation(value, key);
    }, 500),
  ).current;

  useEffect(() => {
    setValidationStates({});
  }, [currentSelectionType]);

  useEffect(() => {
    if (currentSelectionType === "flows" && watchedFlows) {
      watchedFlows.forEach((item: any, index: number) => {
        if (item?.value) {
          debouncedCheck(item.value, `flow-${index}`);
        }
      });
    } else if (currentSelectionType === "channels" && watchedChannels) {
      watchedChannels.forEach((item: any, index: number) => {
        if (item?.value) {
          debouncedCheck(item.value, `channel-${index}`);
        }
      });
    }
  }, [watchedFlows, watchedChannels, currentSelectionType, debouncedCheck]);

  const getValidationStatus = (
    index: number,
    type: "flow" | "channel",
  ): "valid" | "invalid" | "checking" | undefined => {
    const key = `${type}-${index}`;
    const value =
      type === "flow"
        ? watchedFlows?.[index]?.value
        : watchedChannels?.[index]?.value;

    if (!value || value.trim() === "") return undefined;
    if (validationStates[key] === undefined) return "checking";
    return validationStates[key] ? "valid" : "invalid";
  };

  const getInputClassName = (
    index: number,
    type: "flow" | "channel",
    baseClassName: string = "",
  ) => {
    const key = `${type}-${index}`;
    const isInvalid = validationStates[key] === false;
    return cn(baseClassName, isInvalid ? "bg-red-100 border-red-300" : "");
  };

  const isFlows = currentSelectionType === "flows";
  const fields = isFlows ? flowFields : channelFields;
  const onAddRow = isFlows
    ? () => appendFlow({ value: "" })
    : () => appendChannel({ value: "" });
  const onRemoveRow = isFlows ? removeFlow : removeChannel;
  const fieldNamePrefix = isFlows ? "payload.flow_ids" : "payload.channels";
  const fieldType = isFlows ? "flow" : "channel";

  return (
    <div className="space-y-12 mt-8">
      {/* Cuxunishli sarlavha qismi (Sentence-like) */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-slate-800">
        <div className="w-48">
          <MySelect
            name="payload.basic.direction"
            control={control}
            options={directionOptions}
            placeholder="Yo'nalish"
          />
        </div>
        <span className="whitespace-nowrap">yo'nalishdagi</span>
        <div className="w-40">
          <MyInput
            name="payload.basic.flow_signal_level"
            control={control}
            placeholder="VC12"
          />
        </div>
        <span className="whitespace-nowrap">va</span>
        <div className="w-48">
          <MySelect
            name="payload.basic.action_type"
            control={control}
            options={actionTypeOptions}
            placeholder="Amal"
          />
        </div>
        <span className="whitespace-nowrap">to'g'risida</span>
      </div>

      {/* Dynamic Sentence Section */}
      <div className="">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-6">
          <div className="w-[300px]">
            <MyInput
              name="payload.basic.company_name"
              control={control}
              placeholder="Masalan: O'ztelekom AK"
              className="border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 rounded-none h-10"
            />
          </div>
          <span className="font-medium">ning</span>
          <div className="w-[180px]">
            <MyDatePicker name="payload.basic.request_date" control={control} />
          </div>
          <span className="font-medium">dagi</span>
          <div className="w-[140px]">
            <MyInput
              name="payload.basic.request_number"
              control={control}
              placeholder="123-ABC"
              className="border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 rounded-none h-10"
            />
          </div>
          <span className="font-medium">-son xatiga asosan,</span>
          <div className="w-[400px]">
            <MyInput
              name="payload.basic.reason"
              control={control}
              placeholder="Masalan: Ta'mirlash ishlari munosabati"
              className="border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 rounded-none h-10"
            />
          </div>
          <span className="font-medium">
            bilan sababli "O'zbektelekom" AK dagi identifikatori
          </span>

          <div className="w-[180px]">
            <MyDatePicker name="payload.basic.start_date" control={control} />
          </div>
          <span className="font-medium">dan,</span>
          <span className="text-slate-900">
            quyidagi ishlar amalga oshirilsin:
          </span>
        </div>
      </div>

      {/* Dynamic Input Matrix Section */}
      <div className="mt-6 flex flex-col gap-4 border p-6 rounded-2xl bg-white shadow-sm border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-bold text-lg text-slate-800">Elementlar</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">
              Turini tanlang:
            </span>
            <MySelect
              control={control}
              name="payload.basic.selection_type"
              options={selectionTypeOptions}
              placeholder="Turini tanlang"
              className="w-48"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <MyInput
                  control={control}
                  name={`${fieldNamePrefix}.${index}.value`}
                  placeholder={
                    isFlows
                      ? "ID reyestri (masalan: 12345)"
                      : "Kanal (masalan: 98765)"
                  }
                  className={getInputClassName(index, fieldType, "h-10")}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getValidationStatus(index, fieldType) === "checking" && (
                    <div className="text-blue-500 animate-spin text-sm">⟳</div>
                  )}
                  {getValidationStatus(index, fieldType) === "valid" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {getValidationStatus(index, fieldType) === "invalid" && (
                    <span title="Topilmadi">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveRow(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
              >
                <Trash2 size={20} />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-fit mt-4 flex items-center gap-2 border-dashed border-2 border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-400 font-medium"
          onClick={onAddRow}
          size="sm"
        >
          <Plus size={16} /> Qator qo'shish
        </Button>
      </div>

      {/* Responsible Person Section */}
      <div className="mt-8">
        <div className="w-64">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Mas'ul o'lchov formi tuzuvchisi:
          </label>
          <MyInput
            name="payload.basic.responsible_3_3"
            control={control}
            placeholder="MBB-2"
            className="border-t-0 border-l-0 border-r-0 border-b-2 border-slate-300 rounded-none h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default BlockActionSection;
