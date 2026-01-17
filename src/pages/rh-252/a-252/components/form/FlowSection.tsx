import { MyDatePicker, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { Control, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface NormalFlowSectionProps {
    control: Control<any>;
    watch: UseFormWatch<any>;
    actionOptions: { label: string; value: string }[];
}

const FlowSection = ({ control, actionOptions }: NormalFlowSectionProps) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            {/* Matn ko'rinishidagi asosiy qism */}
            <div className="  ">
                <div className="flex flex-wrap items-center gap-x-2">
                    {/* Tashkilot nomi */}
                    <div className="min-w-[300px] flex-1  border-b-2  border-gray-300 focus-within:border-blue-500 transition-all">
                        <MyInput
                            name="payload.basic.organization_name"
                            control={control}
                            placeholder="“O‘zbektelekom” AK Namangan filiali"
                            className="rounded-none border-none bg-transparent h-10 p-0 focus:ring-0 "
                        />
                    </div>

                    <span>ning</span>

                    {/* Murojaat sanasi */}
                    <div className="w-[150px] border-b-2 border-gray-300 focus-within:border-blue-500">
                        <MyDatePicker
                            name="payload.basic.request_date"
                            control={control}
                            className="rounded-none  p-0"
                        />
                    </div>

                    <span>dagi</span>

                    {/* Murojaat raqami */}
                    <div className="w-[180px] border-b-2   border-gray-300 focus-within:border-blue-500">
                        <MyInput
                            name="payload.basic.request_number"
                            control={control}
                            placeholder="55-02-11/153-son"
                            className=" rounded-none border-none bg-transparent h-10 p-0 focus:ring-0 text-center"
                        />
                    </div>

                    <span>murojaatiga binoan,</span>

                    {/* Justification - Ishlab chiqarish ehtiyoji uchun */}
                    <div className="min-w-[250px] flex-1 border-b-2  border-gray-300 focus-within:border-blue-500">
                        <MyInput
                            name="payload.basic.justification"
                            control={control}
                            placeholder="ishlab chiqarish ehtiyoji uchun"
                            className="rounded-none border-none bg-transparent h-10 p-0 focus:ring-0 italic"
                        />
                    </div>

                    {/* Deadline - Quyidagi sanadan boshlab */}
                    <div className="w-[180px] border-b-2 mt-3 border-gray-300 focus-within:border-blue-500">
                        <MyDatePicker
                            name="payload.basic.deadline"
                            control={control}
                            className="border-none bg-transparent h-10 p-0 focus:ring-0"
                        />
                    </div>

                    <span>dan quyidagi ishlar amalga oshirilsin:</span>
                </div>
            </div>

            {/* Signal Level va Actions - (17-45 uchun xos) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-blue-50/30 rounded-lg border border-blue-100">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase">Signal darajasi (Level):</label>
                    <MyInput
                        name="payload.basic.signal_level"
                        control={control}
                        placeholder="Masalan: 2Mb/s"
                        className="h-11 shadow-sm"
                    />
                </div>


                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase">Harakatlar (Actions):</label>
                    <MySelect
                        control={control}
                        name="payload.basic.actions"
                        options={actionOptions}
                        placeholder={t("Harakatlarni tanlang...")}
                        isClearable
                        isMulti
                        required
                        className="min-h-[44px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default FlowSection;

