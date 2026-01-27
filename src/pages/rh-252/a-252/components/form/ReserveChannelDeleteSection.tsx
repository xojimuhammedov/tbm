import { useFieldArray, Control, useWatch } from "react-hook-form";
import { MyInput, MyDatePicker } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui";
import { Plus, Trash2, AlertCircle, CheckCircle, Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import { debounce } from "lodash";
import { request } from "@/request";
import { useState } from "react";

interface AAGBackupDeleteSectionProps {
  control: Control<any>;
}

interface ValidationStates {
  [key: string]: boolean;
}

const AAGBackupDeleteSection = ({ control }: AAGBackupDeleteSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "payload.delete.elements",
  });
  const [validationStates, setValidationStates] = useState<ValidationStates>(
    {},
  );
  const watchedElements = useWatch({
    control,
    name: "payload.delete.elements",
  });

  const handleAddId = () => {
    append("");
  };

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
      const res = await request.get(
        `/api/rh-252/order/check?idOrChannel=${encodeURIComponent(value)}&isEmpty=${false}`,
      );
      const isValid = res.data?.valid !== false;

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
    debounce((value: string, key: string) => {
      checkValidation(value, key);
    }, 500),
  ).current;

  useEffect(() => {
    if (!watchedElements || watchedElements.length === 0) return;

    watchedElements.forEach((value: string, index: number) => {
      if (value) {
        const key = `delete-element-${index}`;
        debouncedCheck(value, key);
      }
    });
  }, [watchedElements, debouncedCheck]);

  const getValidationStatus = (
    index: number,
  ): "valid" | "invalid" | "checking" | undefined => {
    const key = `delete-element-${index}`;
    const value = watchedElements?.[index];

    if (!value || value.trim() === "") return undefined;

    if (validationStates[key] === undefined) return "checking";
    return validationStates[key] ? "valid" : "invalid";
  };

  return (
    <div className="">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">
          Zaxira AAG kanallarni o'chirish to'g'risida
        </h2>

        <div className="text-gray-800 leading-relaxed text-justify p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block w-64">
              <MyInput
                control={control}
                name="payload.basic.organization_name"
                placeholder="1-Mintaqaviy boshqaruv bog'lamasi"
                className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent"
              />
            </span>
            <span>ning</span>
            <span className="inline-block w-40">
              <MyDatePicker
                control={control}
                name="payload.basic.request_date"
              />
            </span>
            <span>dagi</span>
            <span className="inline-block w-20">
              <MyInput
                control={control}
                name="payload.basic.request_number"
                placeholder="31-son bildirgisi"
                className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent"
              />
            </span>
            <span>ga binoan </span>
            <span>
              <MyInput
                control={control}
                name="payload.basic.justification"
                placeholder="tarmoqda tashkil qilingan 13x64 Kbit/s asosiy kanallar o‘chirilganligi sababli"
                className="w-100 border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent italic text-sm"
              />
            </span>
            <span className="inline-block w-40">
              <MyDatePicker control={control} name="payload.basic.deadline" />
            </span>
            <span>
              dan ushbu kanallar uchun ishlagan quyidagi zaxira (AAG) kanallari
              o'chirilsin.
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Trash className="w-5 h-5 text-blue-600" />
            O'chirilishi kerak bo'lgan ID raqamlar
          </h3>
          <Button
            type="button"
            onClick={handleAddId}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            ID qo'shish
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field, index) => {
            const status = getValidationStatus(index);
            return (
              <div
                key={field.id}
                className={`flex items-center gap-2 p-2 bg-white border rounded-lg shadow-sm transition-colors ${
                  status === "valid"
                    ? "border-green-300 bg-green-50"
                    : status === "invalid"
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="bg-gray-100 text-gray-500 text-xs font-mono px-2 py-1 rounded">
                  {index + 1}.
                </div>
                <div className="flex-1">
                  <MyInput
                    control={control}
                    name={`payload.delete.elements.${index}`}
                    placeholder="ID-3623"
                    className="border-none focus:ring-0 h-8 text-sm font-medium"
                  />
                </div>
                {status === "checking" && (
                  <div className="text-blue-500 animate-spin text-lg">⟳</div>
                )}
                {status === "valid" && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                {status === "invalid" && (
                  <span title="ID topilmadi">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-400 hover:text-red-600 p-1 transition-colors"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
            Hali hech qanday ID kiritilmadi. "ID qo'shish" tugmasini bosing.
          </div>
        )}
      </div>
    </div>
  );
};

export default AAGBackupDeleteSection;
