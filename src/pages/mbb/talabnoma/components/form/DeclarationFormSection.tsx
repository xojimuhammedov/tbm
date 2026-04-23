import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { MyInput, MyDatePicker } from "dgz-ui-shared/components/form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface DeclarationFormSectionProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
}

export const DeclarationFormSection = ({
  control,
  setValue,
}: DeclarationFormSectionProps) => {
  const contextValue = useWatch({
    control,
    name: "context",
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-4">Bildirgi №</h2>
        <MyInput
          name="code"
          control={control}
          placeholder="2026/16"
          className="inline-block w-48 border-t-0 border-l-0 border-r-0 border-gray-400 rounded-none h-8 text-center text-lg bg-transparent"
        />
      </div>
      <div className="mb-8 text-gray-800 leading-relaxed">
        <div className="flex flex-wrap items-center gap-2 mb-6 text-lg">
          <MyInput
            control={control}
            name="organization_name"
            placeholder="“O‘zTTBRM” DUK"
            className="inline-block w-[350px] border-t-0 border-l-0 border-r-0 border-gray-400 rounded-none h-8 mx-1 bg-transparent"
          />
          <span>ning</span>
          <span className="inline-block mx-2 w-44">
            <MyDatePicker control={control} name="request_date" />
          </span>
          <span>dagi</span>
          <span className="inline-block mx-2 w-48">
            <MyInput
              control={control}
              name="request_number"
              placeholder="17-48-262/199"
              className="border-t-0 border-l-0 border-r-0 border-gray-400 rounded-none h-8 bg-transparent"
            />
          </span>
          <span>-sonli farmoyishiga asosan</span>
        </div>

        <div className="min-h-[400px]">
          <ReactQuill
            theme="snow"
            value={contextValue || ""}
            onChange={(val) => setValue("context", val)}
            className="h-[350px]"
            placeholder="Matnni kiriting..."
          />
        </div>
      </div>
    </div>
  );
};
