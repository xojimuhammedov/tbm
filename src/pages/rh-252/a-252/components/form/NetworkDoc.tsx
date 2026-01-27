import { useFieldArray, Control, useWatch } from "react-hook-form";
import { MyInput } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui";
import {
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2,
  Hash,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { request } from "@/request";

interface IDSection1731Props {
  control: Control<any>;
}

const IDSection1731 = ({ control }: IDSection1731Props) => {
  // Validatsiya natijalarini saqlash: { "index-0": true, "index-1": "loading" }
  const [validationStates, setValidationStates] = useState<
    Record<string, boolean | "loading">
  >({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payload.flow_ids", // 17-31 interfacega moslandi
  });

  const watchedFlows = useWatch({
    control,
    name: "payload.flow_ids",
  });

  const checkID = async (value: string, index: number) => {
    if (!value || value.trim() === "") return;

    const stateKey = `index-${index}`;
    setValidationStates((prev) => ({ ...prev, [stateKey]: "loading" }));

    try {
      // Backenddan ID mavjudligini tekshirish
      const res = await request.get(
        `/api/rh-252/order/check?idOrChannel=${encodeURIComponent(value)}&isEmpty=false`,
      );
      const isValid = res.data?.valid !== false;

      setValidationStates((prev) => ({ ...prev, [stateKey]: isValid }));
    } catch (error) {
      console.error("Validatsiya xatosi:", error);
      setValidationStates((prev) => ({ ...prev, [stateKey]: false }));
    }
  };

  const debouncedCheck = useRef(
    debounce((value: string, index: number) => {
      checkID(value, index);
    }, 600),
  ).current;

  useEffect(() => {
    watchedFlows?.forEach((value: string, index: number) => {
      if (value) {
        debouncedCheck(value, index);
      }
    });
  }, [watchedFlows, debouncedCheck]);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Hash className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Flow ID kiritish
            </h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Payload 17-31
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => append("")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          ID qo'shish
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {fields.map((field, index) => {
          const status = validationStates[`index-${index}`];
          const currentValue = watchedFlows?.[index];

          return (
            <div
              key={field.id}
              className={`relative flex items-center gap-2 p-1 pl-3 bg-white border rounded-lg transition-all duration-200 ${
                status === true
                  ? "border-green-500 bg-green-50/30"
                  : status === false
                    ? "border-red-500 bg-red-50/30"
                    : "border-gray-200 focus-within:border-blue-400"
              }`}
            >
              <span className="text-[10px] font-bold text-gray-400 w-4">
                {index + 1}
              </span>

              <div className="flex-1">
                <MyInput
                  control={control}
                  name={`payload.flow_ids.${index}`}
                  placeholder="ID raqamini yozing..."
                  className="border-none focus:ring-0 h-9 bg-transparent text-sm font-medium placeholder:font-normal"
                />
              </div>

              <div className="flex items-center gap-1 pr-2">
                {currentValue && status === "loading" && (
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                )}
                {currentValue && status === true && (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
                {currentValue && status === false && (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}

                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                    const newStates = { ...validationStates };
                    delete newStates[`index-${index}`];
                    setValidationStates(newStates);
                  }}
                  className="ml-1 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {fields.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
          <Hash className="w-10 h-10 text-gray-200 mb-2" />
          <p className="text-gray-400 text-sm italic">Hali IDlar qo'shilmadi</p>
        </div>
      )}
    </div>
  );
};

export default IDSection1731;
