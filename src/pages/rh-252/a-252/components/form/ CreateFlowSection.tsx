import { MyInput } from "dgz-ui-shared/components/form";
import { Button, cn } from "dgz-ui";
import { PlusSquare, Trash2 } from "lucide-react";
import { Control, FieldArrayWithId, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import useGetEmptyFlowIds from "@/pages/rh-252/a-252/hooks/Usegetemptyflowids.ts";

interface CreateFlowSectionProps {
  control: Control<any>;
  fields: FieldArrayWithId<any, "payload.create.flow_ids", "id">[];
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
  onGenerate: () => void;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

const CreateFlowSection = ({
  control,
  fields,
  onAddRow,
  onRemoveRow,
  onGenerate,
  watch,
  setValue,
}: CreateFlowSectionProps) => {
  const [fetchCount, setFetchCount] = useState(0);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

  const { refetch } = useGetEmptyFlowIds({
    count: fetchCount,
    enabled: fetchCount > 0,
    onSuccess: (data: string[]) => {
      if (data && data.length > 0) {
        const newIds = data.filter(id => !usedIds.has(id));
        const startIndex = fields.length - newIds.length;

        newIds.forEach((id, idx) => {
          const fieldIndex = startIndex + idx;
          if (fieldIndex >= 0 && fieldIndex < fields.length) {
            setValue(`payload.create.flow_ids.${fieldIndex}.code`, id);
            setUsedIds(prev => new Set([...prev, id]));
          }
        });
      }
    },
  });

  const handleGenerate = () => {
    const count = watch("count");
    if (count && Number(count) > 0) {
      setFetchCount(Number(count));
      onGenerate();
    }
  };

  const handleAddRow = () => {
    setFetchCount(1);
    onAddRow();
  };

  const handleRemoveRow = (index: number) => {
    const codeValue = watch(`payload.create.flow_ids.${index}.code`);
    if (codeValue) {
      setUsedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(codeValue);
        return newSet;
      });
    }
    onRemoveRow(index);
  };

  useEffect(() => {
    if (fetchCount > 0) {
      refetch();
    }
  }, [fetchCount, refetch]);

  return (
    <div className="mt-6 border p-4 rounded-lg">
      <h3 className="font-semibold mb-2 mt-4">Tashkil etish</h3>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <MyInput control={control} name="point_a" placeholder="A-stansiya" />
        <MyInput control={control} name="point_b" placeholder="B-stansiya" />
        <MyInput control={control} name="count" placeholder="Count" />
        <Button type="button" onClick={handleGenerate}>
          Yaratish
        </Button>
      </div>

      {fields.map((field, index) => {
        const isLast = index === fields.length - 1;
        return (
          <div
            key={field.id}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 my-2 w-full items-center"
          >
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.signal_level`}
              placeholder="Signal level"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.code`}
              placeholder="ID Number"
              className={cn(
                "border border-t-0 border-l-0 border-r-0 rounded-none h-7",
                watch(`payload.create.flow_ids.${index}.id_exist`) === true
                  ? "bg-red-100"
                  : "",
              )}
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.point_a`}
              placeholder="Point A"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.port_a`}
              placeholder="Port A"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.device_a`}
              placeholder="Device A"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.point_b`}
              placeholder="Point B"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.port_b`}
              placeholder="Port B"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.device_b`}
              placeholder="Device B"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <div className="flex gap-2">
              {isLast && (
                <PlusSquare
                  className="cursor-pointer"
                  size={18}
                  color="blue"
                  onClick={handleAddRow}
                />
              )}
              <Trash2
                className="cursor-pointer"
                size={18}
                color="red"
                onClick={() => handleRemoveRow(index)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CreateFlowSection;