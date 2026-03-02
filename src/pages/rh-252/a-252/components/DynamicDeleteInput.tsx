import { Button } from "dgz-ui";
import { MyInput } from "dgz-ui-shared/components/form";
import { Trash2, Plus } from "lucide-react";
import React from "react";
import { useFieldArray, Control } from "react-hook-form";

interface DynamicIdInputProps {
  control: Control<any>;
  name: string; // Masalan: "payload.delete.flow_ids"
}

const DynamicIdInput: React.FC<DynamicIdInputProps> = ({ control, name }) => {
  // Field array orqali formalarni boshqarish
  const { fields, append, remove } = useFieldArray({
    control, // Bu yerda shunchaki control (form.control emas!)
    name,
  });

  // Agar massiv bo'sh bo'lsa, avtomatik bitta bo'sh qator qo'shish
  React.useEffect(() => {
    if (fields.length === 0) {
      append({ value: "" });
    }
  }, [fields, append]);

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      if (index === fields.length - 1 && target.value.trim() !== "") {
        append({ value: "" });
      }
    }
  };

  return (
      <div className="w-full space-y-4">
        <h2 className="text-xl font-semibold">O'chirish to'g'risida</h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kanal va ID ni kiriting (Enter bosib yangi qator qo'shing)
        </label>

        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 w-full">
                <div className="flex-1">
                  <MyInput
                      control={control} // Propsdan kelayotgan control
                      name={`${name}.${index}.value`} // Har bir input uchun unique name
                      placeholder="Masalan: ID-6620"
                      onKeyDown={(e) => handleKeyDown(index, e as any)}
                  />
                </div>

                {fields.length > 1 && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 shrink-0"
                    >
                      <Trash2 size={18} />
                    </Button>
                )}
              </div>
          ))}
        </div>

        <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => append({ value: "" })}
            className="mt-2"
        >
          <Plus size={16} className="mr-2" /> Yangi qator qo'shish
        </Button>
      </div>
  );
};

export default DynamicIdInput;