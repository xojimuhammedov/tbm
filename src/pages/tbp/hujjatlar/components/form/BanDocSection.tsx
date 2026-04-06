import { MyInput, MySelect } from "dgz-ui-shared/components/form";
import { Control } from "react-hook-form";
import { MyDateTimePicker } from "./MyDateTimePicker.tsx";

interface BanDocSectionProps {
  control: Control<any>;
}

const BanDocSection = ({ control }: BanDocSectionProps) => {
  const titleOptions = [
    { label: "Taqiq kiritildi", value: "BAN" },
    { label: "Taqiq yechildi", value: "BAN_REMOVE" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 w-full border-b pb-6">
        <div className="w-1/4 mx-auto">
          <MySelect
            name="payload.basic.title"
            control={control}
            options={titleOptions}
            placeholder="Taqiq turi"
            isClearable
            className="text-lg border-none w-full p-0 rounded-none"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <MyDateTimePicker
            name="payload.basic.start_time"
            control={control}
            className="w-52 border-none p-0 text-center"
          />
          <span className="text-gray-500">dan</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <label className="font-bold min-w-[170px]">Mas'ul:</label>
          <div className="flex-1 w-full max-w-lg">
            <MyInput
              name="payload.basic.responsible"
              control={control}
              placeholder="МВР AI-9 - Аkrоmov"
              className="border-none h-8 p-0 pl-1.5 font-medium"
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <label className="font-bold min-w-[170px] pt-2">Ma'lumot:</label>
          <div className="flex-1">
            <textarea
              {...control.register("payload.basic.context")}
              placeholder="Taqiq matni..."
              className="w-full border-none p-0 min-h-[80px] pl-1.5 pt-2 bg-transparent focus:ring-0 resize-none text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanDocSection;
