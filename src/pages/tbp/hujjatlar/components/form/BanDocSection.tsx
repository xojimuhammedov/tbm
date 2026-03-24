import { Button } from "dgz-ui";
import { MyInput, MySelect } from "dgz-ui-shared/components/form";
import { Plus, Trash2 } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";
import { MyDateTimePicker } from "./MyDateTimePicker.tsx";

interface BanDocSectionProps {
  control: Control<any>;
}

const BanDocSection = ({ control }: BanDocSectionProps) => {
  const {
    fields: consumers,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "payload.consumers",
  });

  const titleOptions = [
    { label: "Taqiq", value: "BAN" },
    { label: "Taqiq yo'q", value: "BAN_REMOVE" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 w-full border-b pb-6">
        <MySelect
          name="payload.basic.title"
          control={control}
          options={titleOptions}
          placeholder="Taqiq turi"
          isClearable
          className="text-center text-xl border-none w-full p-0 rounded-none font-bold uppercase"
        />

        <div className="flex items-center justify-center gap-4">
          <MyDateTimePicker
            name="payload.basic.start_time"
            control={control}
            className="w-52 border-none p-0 text-center"
          />
          <span className="text-gray-500">dan</span>
          <MyInput
            name="payload.basic.orientation"
            control={control}
            placeholder="O'zbekiston Respublikasi bo'yicha"
            className="text-center border-none font-bold"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="font-bold min-w-[170px]">Mas'ul:</label>
          <MyInput
            name="payload.basic.responsible"
            control={control}
            placeholder="МВР AI-9 - Аkrоmov"
            className="flex-1 border-none p-0 font-medium"
          />
        </div>

        <div className="flex items-start gap-4">
          <label className="font-bold min-w-[170px] pt-2">Ma'lumot:</label>
          <div className="flex-1">
            <textarea
              {...control.register("payload.basic.context")}
              placeholder="Taqiq matni..."
              className="w-full border-none p-0 min-h-[80px] bg-transparent focus:ring-0 resize-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <label className="font-bold min-w-[170px] pt-2">
            Iste'molchilar:
          </label>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap gap-2">
              {consumers.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-1 border-b px-1 py-1 group"
                >
                  <MyInput
                    name={`payload.consumers.${index}`}
                    control={control}
                    placeholder="AI-98"
                    className="border-none bg-transparent p-0 w-28 h-6 text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 text-blue-600"
                onClick={() => append("")}
              >
                <Plus className="w-3 h-3 mr-1" /> Qo'shish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanDocSection;
