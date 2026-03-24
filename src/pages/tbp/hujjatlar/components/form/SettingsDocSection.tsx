import {
  Control,
  useFieldArray,
} from "react-hook-form";
import { MyInput, MyDatePicker, MySelect } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui";
import { Plus, Trash2, X } from "lucide-react";
import { MyDateTimePicker } from "./MyDateTimePicker.tsx";

interface SettingsDocSectionProps {
  control: Control<any>;
  staffOptions: { label: string; value: string }[];
}

const SettingsDocSection = ({ control, staffOptions }: SettingsDocSectionProps) => {
  const { fields: flows, append: appendFlow, remove: removeFlow } = useFieldArray({
    control,
    name: "payload.with_a_pause",
  });

  const { fields: noRaqami, append: appendNo, remove: removeNo } = useFieldArray({
    control,
    name: "payload.basic.no_raqami",
  });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 w-full border-b pb-6">
        <div className="w-full max-w-2xl mx-auto">
          <MyInput
            name="payload.basic.title"
            control={control}
            placeholder="Tezkor ishlar"
            className="text-xl border-none w-full p-0 rounded-none font-bold uppercase pl-1.5"
          />
        </div>


        <div className="flex flex-col items-center gap-2">
          <div className="w-full max-w-lg">
            <MyInput
              name="payload.basic.connection_closure_type"
              control={control}
              placeholder="«2-1» aloqani yopish yo’li bilan"
              className="font-bold border-none h-8 p-0 pl-1.5"
            />
          </div>
          <div className="flex items-center gap-2 font-medium">
            <MyDateTimePicker
              name="payload.basic.start_time"
              control={control}
              className="w-55 border-none p-0 text-center"
            />
            <span className="text-gray-500">dan</span>
            <MyDateTimePicker
              name="payload.basic.end_time"
              control={control}
              className="w-55 border-none p-0 text-center"
            />
            <span className="text-gray-500">gacha</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 w-full">
        <div className="flex items-center gap-4">
          <label className="font-bold min-w-[170px]">Stansiya oralig'i:</label>
          <div className="flex-1 w-full max-w-lg">
            <MyInput
              name="payload.basic.station_interval"
              control={control}
              placeholder="К711А a.1 m.61272 - m.61261."
              className="border-none h-8 p-0 pl-1.5 font-medium"
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <label className="font-bold min-w-[170px] pt-2">NO raqami:</label>
          <div className="flex-1 space-y-2">
             <div className="flex flex-wrap gap-2">
                {noRaqami.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-1 border-b px-1 py-1 group">
                    <MyInput
                      name={`payload.basic.no_raqami.${index}`}
                      control={control}
                      placeholder="1015473"
                      className="border-none bg-transparent p-0 w-24 h-8 pl-1.5 text-sm font-mono"
                    />
                    <button type="button" onClick={() => removeNo(index)} className="text-slate-400 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <Button type="button" size="sm" variant="ghost" className="h-8 text-blue-600" onClick={() => appendNo("")}>
                  <Plus className="w-3 h-3 mr-1" /> Qo'shish
                </Button>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-bold min-w-[170px]">NO xolati:</label>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-20">
              <MyInput
                name="payload.basic.no_status"
                control={control}
                placeholder="«3»"
                className="border-none h-8 p-0 pl-1.5 font-medium"
              />
            </div>
            <div className="flex items-center gap-2">
               <div className="w-auto">
                  <MyDateTimePicker
                    name="payload.basic.no_status_date"
                    control={control}
                  />
               </div>
              <span className="text-gray-500 font-medium">dan</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-bold min-w-[170px]">Ish olib borish sababi:</label>
          <div className="flex-1 w-full max-w-lg">
            <MyInput
              name="payload.basic.cause"
              control={control}
              placeholder="1063O-Xayraton yo'nalishida signal so'nish sababini aniqlash..."
              className="border-none h-8 p-0 pl-1.5 font-medium"
            />
          </div>
        </div>

        <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="font-bold min-w-[170px]">To'xtalish bilan:</label>
              <Button type="button" size="sm" variant="ghost" onClick={() => appendFlow("")} className="text-blue-600 h-8">
                <Plus className="w-3 h-3 mr-1" /> Yangi ID qo'shish
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {flows.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 p-1 border-b">
                  <span className="text-xs font-bold text-slate-400">{index + 1}.</span>
                  <MyInput
                    control={control}
                    name={`payload.with_a_pause.${index}`}
                    placeholder="ID-3881..."
                    className="border-none bg-transparent p-0 h-8 pl-1.5 font-mono text-sm w-32"
                  />
                  <button type="button" onClick={() => removeFlow(index)} className="text-slate-300 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-bold min-w-[170px]">Boshqaruv stansiya:</label>
          <div className="flex-1 w-full max-w-lg">
            <MyInput
              name="payload.basic.control_station"
              control={control}
              placeholder="Janubiy filiali 6-bog'lama hududiy menejeri..."
              className="border-none h-8 p-0 pl-1.5 font-medium"
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <label className="font-bold min-w-[170px] pt-1">Kelishilgan:</label>
          <div className="flex-1">
            <textarea
              {...control.register("payload.basic.agreed")}
              placeholder="Texnik direktori J.Aripov..."
              className="w-full border-none p-0 min-h-[60px] font-medium pl-1.5 pt-1.5 bg-transparent focus:ring-0 resize-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="space-y-2">
               <label className="font-bold text-sm">Talabnoma tuzuvchi (IP):</label>
               <div className="flex items-center gap-2">
                  <MyInput
                    name="payload.basic.requirement_ip"
                    control={control}
                    placeholder="Н7-0-2-12/686"
                    className="border-none h-8 p-0 pl-1.5 font-medium"
                  />
                  <div className="w-32 border-b">
                    <MyDatePicker
                      name="payload.basic.requirement_ip_date"
                      control={control}
                    />
                  </div>
               </div>
            </div>
            <div className="space-y-2">
              <label className="font-bold text-sm">Talabnoma tuzuvchi:</label>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <MySelect
                    control={control}
                    name="payload.basic.requirement_user"
                    options={staffOptions || []}
                    placeholder="Tanlang..."
                    isClearable
                    required
                  />
                </div>
                <div className="w-32">
                  <MyDatePicker
                    name="payload.basic.requirement_user_date"
                    control={control}
                  />
                </div>
              </div>
            </div>
           </div>
            </div>
      </div>
  );
};

export default SettingsDocSection;
