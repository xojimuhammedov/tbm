import { MyInput, MySelect } from "dgz-ui-shared/components/form";
import { Button, cn } from "dgz-ui";
import { Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { Control, FieldArrayWithId, useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { request } from "@/request";

interface UpdateFlowSectionProps {
  control: Control<any>;
  fields: FieldArrayWithId<any, "payload.update.flow_ids", "id">[];
  currentUpdateType: string;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
  getValidationClass: (index: number, field: string) => string;
}

interface ValidationStates {
  [key: string]: boolean;
}

const UpdateFlowSection = ({
  control,
  fields,
  currentUpdateType,
  onAddRow,
  onRemoveRow,
}: UpdateFlowSectionProps) => {
  const [validationStates, setValidationStates] = useState<ValidationStates>(
    {},
  );

  const watchedUpdateFlowIds = useWatch({
    control,
    name: "payload.update.flow_ids",
  });

  const updateTypeOptions = [
    { label: "Channels", value: "channels" },
    { label: "Flows", value: "flows" },
  ];

  const checkValidation = async (
    value: string,
    isEmpty: boolean,
    key: string,
  ) => {
    if (!value || value.trim() === "") {
      setValidationStates((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      return;
    }

    try {
      const res = await request.get(
        `/api/rh-252/order/check?idOrChannel=${encodeURIComponent(value)}&isEmpty=${isEmpty}`,
      );

      // Agar success mavjud bo'lsa, uning qiymatidan foydalanish
      // Agar success yo'q bo'lsa yoki false bo'lsa - invalid
      const isValid = res.data?.success === true;

      console.log("Validation response:", res.data, "isValid:", isValid); // Debug uchun

      setValidationStates((prev) => ({
        ...prev,
        [key]: isValid,
      }));
    } catch (error) {
      console.error("Validation error:", error);
      setValidationStates((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  const debouncedCheck = useRef(
    debounce((value: string, isEmpty: boolean, key: string) => {
      checkValidation(value, isEmpty, key);
    }, 500),
  ).current;

  useEffect(() => {
    setValidationStates({});
  }, [currentUpdateType]);

  useEffect(() => {
    if (!watchedUpdateFlowIds || watchedUpdateFlowIds.length === 0) return;

    watchedUpdateFlowIds.forEach((item: any, index: number) => {
      if (currentUpdateType === "channels") {
        if (item?.old) {
          const key = `update-${index}-old`;
          debouncedCheck(item.old, false, key);
        }
        if (item?.new) {
          const key = `update-${index}-new`;
          debouncedCheck(item.new, true, key);
        }
      } else if (currentUpdateType === "flows") {
        if (item?.code) {
          const key = `update-${index}-code`;
          debouncedCheck(item.code, false, key);
        }
      }
    });
  }, [watchedUpdateFlowIds, currentUpdateType, debouncedCheck]);

  const getValidationStatus = (
    index: number,
    field: string,
  ): "valid" | "invalid" | "checking" | undefined => {
    const key = `update-${index}-${field}`;
    const value = watchedUpdateFlowIds?.[index]?.[field];

    if (!value || value.trim() === "") return undefined;

    if (validationStates[key] === undefined) return "checking";
    return validationStates[key] ? "valid" : "invalid";
  };

  const getInputClassName = (
    index: number,
    field: string,
    baseClassName: string = "",
  ) => {
    const key = `update-${index}-${field}`;
    const isInvalid = validationStates[key] === false;
    return cn(baseClassName, isInvalid ? "bg-red-100 border-red-300" : "");
  };

  return (
    <div className="mt-6 flex flex-col gap-4 border p-4 rounded-xl">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="font-bold text-lg">Ko'chirish (Update)</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            Turini tanlang:
          </span>
          <MySelect
            control={control}
            name="payload.update.update_type"
            options={updateTypeOptions}
            placeholder="Turini tanlang"
            className="w-48"
          />
        </div>
      </div>

      {fields.length > 0 && (
        <div
          className={cn(
            "grid gap-2 px-2 font-semibold text-xs text-gray-500",
            currentUpdateType === "channels"
              ? "grid-cols-[1fr_1fr_80px]"
              : "grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr_1fr_80px]",
          )}
        >
          {currentUpdateType === "channels" ? (
            <>
              <div>Eski (Old)</div>
              <div>Yangi (New)</div>
            </>
          ) : (
            <>
              <div>Code</div>
              <div>Point A</div>
              <div>Point B</div>
              <div>Device A</div>
              <div>Device B</div>
              <div>Port A</div>
              <div>Port B</div>
              <div>Signal Level</div>
            </>
          )}
          <div></div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            {currentUpdateType === "channels" ? (
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="relative">
                  <MyInput
                    control={control}
                    name={`payload.update.flow_ids.${index}.old`}
                    placeholder="ID01/1"
                    className={getInputClassName(index, "old")}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {getValidationStatus(index, "old") === "checking" && (
                      <div className="text-blue-500 animate-spin text-sm">
                        ⟳
                      </div>
                    )}
                    {getValidationStatus(index, "old") === "valid" && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {getValidationStatus(index, "old") === "invalid" && (
                      <span title="Topilmadi">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <MyInput
                    control={control}
                    name={`payload.update.flow_ids.${index}.new`}
                    placeholder="ID0168/1"
                    className={getInputClassName(index, "new")}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {getValidationStatus(index, "new") === "checking" && (
                      <div className="text-blue-500 animate-spin text-sm">
                        ⟳
                      </div>
                    )}
                    {getValidationStatus(index, "new") === "valid" && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {getValidationStatus(index, "new") === "invalid" && (
                      <span title="Topilmadi">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr_1fr] gap-2 flex-1">
                <div className="relative">
                  <MyInput
                    control={control}
                    name={`payload.update.flow_ids.${index}.code`}
                    placeholder="Code"
                    className={getInputClassName(index, "code", "h-9 text-xs")}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {getValidationStatus(index, "code") === "checking" && (
                      <div className="text-blue-500 animate-spin text-xs">
                        ⟳
                      </div>
                    )}
                    {getValidationStatus(index, "code") === "valid" && (
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    )}
                    {getValidationStatus(index, "code") === "invalid" && (
                      <span title="Topilmadi">
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      </span>
                    )}
                  </div>
                </div>
                <MyInput
                  control={control}
                  name={`payload.update.flow_ids.${index}.point_a`}
                  placeholder="Point A"
                  className="h-9 text-xs"
                />
                <MyInput
                  control={control}
                  name={`payload.update.flow_ids.${index}.point_b`}
                  placeholder="Point B"
                  className="h-9 text-xs"
                />
                <MyInput
                  control={control}
                  name={`payload.update.flow_ids.${index}.device_a`}
                  placeholder="Device A"
                  className="h-9 text-xs"
                />
                <MyInput
                  control={control}
                  name={`payload.update.flow_ids.${index}.device_b`}
                  placeholder="Device B"
                  className="h-9 text-xs"
                />
                <MyInput
                  control={control}
                  name={`payload.update.flow_ids.${index}.port_a`}
                  placeholder="Port A"
                  className="h-9 text-xs"
                />
                <MyInput
                  control={control}
                  name={`payload.update.flow_ids.${index}.port_b`}
                  placeholder="Port B"
                  className="h-9 text-xs"
                />
                <MyInput
                  control={control}
                  name={`payload.update.flow_ids.${index}.signal_level`}
                  placeholder="Signal"
                  className="h-9 text-xs"
                />
              </div>
            )}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemoveRow(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-200"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-fit mt-2 flex items-center gap-2 border-dashed border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
        onClick={onAddRow}
        size="sm"
      >
        <Plus size={16} /> Qator qo'shish
      </Button>
    </div>
  );
};

export default UpdateFlowSection;
