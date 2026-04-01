import { Control } from "react-hook-form";
import {
  MyInput,
  MyDatePicker,
} from "dgz-ui-shared/components/form";

interface BlockActionSectionProps {
  control: Control<any>;
  setValue: (name: string, value: any, options?: any) => void;
}

const BlockActionSection = ({ control }: BlockActionSectionProps) => {

  return (
    <div className="space-y-12 mt-8">
      {/* Dynamic Sentence Section */}
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-6">
          <div className="w-[300px]">
            <MyInput
              name="payload.basic.company_name"
              control={control}
              placeholder="Masalan: O'ztelekom AK"
              className="border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 rounded-none h-10 bg-slate-50/50 px-3 text-lg font-semibold"
            />
          </div>
          <span className="font-medium">ning</span>
          <div className="w-[180px]">
            <MyDatePicker
              name="payload.basic.request_date"
              control={control}
            />
          </div>
          <span className="font-medium">dagi</span>
          <div className="w-[140px]">
            <MyInput
              name="payload.basic.request_number"
              control={control}
              placeholder="123-ABC"
              className="border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 rounded-none h-10 bg-slate-50/50 px-3 text-lg font-semibold"
            />
          </div>
          <span className="font-medium">-son xatiga asosan,</span>
          <div className="w-[400px]">
            <MyInput
              name="payload.basic.reason"
              control={control}
              placeholder="Masalan: Ta'mirlash ishlari munosabati"
              className="border-t-0 border-l-0 border-r-0 border-b-2 border-slate-200 rounded-none h-10 bg-slate-50/50 px-3 text-lg font-semibold"
            />
          </div>
          <span className="font-medium">
            bilan sababli "O'zbektelekom" AK dagi identifikatori
          </span>
          <div className="w-[180px]">
            <MyDatePicker
              name="payload.basic.start_date"
              control={control}
            />
          </div>
          <span className="font-medium">dan</span>
          <span className="font-medium">
            quyidagi ishlar amalga oshirilsin:
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlockActionSection;
