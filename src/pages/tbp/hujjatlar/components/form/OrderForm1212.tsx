import { MyInput, MySelect, MyTextarea } from "dgz-ui-shared/components/form";
import { MyDatePicker } from "dgz-ui-shared/components/form";
import { Button, cn } from "dgz-ui";
import { Plus, PlusSquare, Trash2 } from "lucide-react";
import {
  Control,
  useFieldArray,
  UseFormWatch,
  useWatch,
} from "react-hook-form";
import { useMemo } from "react";

interface OrderForm1212Props {
  control: Control<any>;
  watch: UseFormWatch<any>;
}

// ─── Create section ──────────────────────────────────────────────────────────

const CreateFlowSection1212 = ({
  control,
  watch,
}: {
  control: Control<any>;
  watch: UseFormWatch<any>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "payload.create.flow_ids",
  });

  const handleAdd = () =>
    append({
      code: "",
      point_a: "",
      point_b: "",
      signal_level: "",
      port_a: "",
      port_b: "",
      device_a: "",
      device_b: "",
      id_exist: null,
    });

  return (
    <div className="mt-6 border p-4 rounded-lg">
      <h3 className="font-semibold mb-2 mt-4">Tashkil etish</h3>

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
              placeholder="VC12"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.code`}
              placeholder="0041"
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
              name={`payload.create.flow_ids.${index}.device_a`}
              placeholder="Device A"
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
              name={`payload.create.flow_ids.${index}.point_b`}
              placeholder="Point B"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.device_b`}
              placeholder="Device B"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <MyInput
              control={control}
              name={`payload.create.flow_ids.${index}.port_b`}
              placeholder="Port B"
              className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
            />
            <div className="flex gap-2">
              {isLast && (
                <PlusSquare
                  className="cursor-pointer"
                  size={18}
                  color="blue"
                  onClick={handleAdd}
                />
              )}
              <Trash2
                className="cursor-pointer"
                size={18}
                color="red"
                onClick={() => remove(index)}
              />
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={handleAdd}
        className="mt-2 flex items-center gap-2"
      >
        <Plus size={15} /> Qator qo'shish
      </Button>
    </div>
  );
};

// ─── Update section ──────────────────────────────────────────────────────────

const UpdateFlowSection1212 = ({ control }: { control: Control<any> }) => {
  const updateType = useWatch({ control, name: "payload.update.update_type" });

  const {
    fields: channelFields,
    append: appendChannel,
    remove: removeChannel,
  } = useFieldArray({ control, name: "payload.update.channels" });

  const {
    fields: flowFields,
    append: appendFlow,
    remove: removeFlow,
  } = useFieldArray({ control, name: "payload.update.flows" });

  const updateTypeOptions = [
    { label: "Channels", value: "channels" },
    { label: "Flows", value: "flows" },
  ];

  return (
    <div className="mt-6 flex flex-col gap-4 border p-4 rounded-xl">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="font-bold text-lg">Ko'chirish (Update)</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            Turini tanlang:
          </span>
          <MySelect
            control={control}
            name="payload.update.update_type"
            options={updateTypeOptions}
            placeholder="Turini tanlang"
            className="w-48"
          />
        </div>
      </div>

      {/* Channels — faqat "channels" tanlanganda */}
      {updateType === "channels" && (
        <>
          {channelFields.length > 0 && (
            <div className="grid grid-cols-[1fr_1fr_80px] gap-2 px-2 font-semibold text-xs text-gray-500">
              <div>Eski (Old)</div>
              <div>Yangi (New)</div>
              <div />
            </div>
          )}

          <div className="flex flex-col gap-2">
            {channelFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-2 flex-1">
                  <MyInput
                    control={control}
                    name={`payload.update.channels.${index}.old`}
                    placeholder="ID001/1"
                  />
                  <MyInput
                    control={control}
                    name={`payload.update.channels.${index}.new`}
                    placeholder="ID002/1"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeChannel(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendChannel({ old: "", new: "" })}
            className="w-fit mt-2 flex items-center gap-2 border-dashed border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
          >
            <Plus size={16} /> Qator qo'shish
          </Button>
        </>
      )}

      {/* Flows — faqat "flows" tanlanganda */}
      {updateType === "flows" && (
        <>
          {flowFields.length > 0 && (
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr_80px] gap-2 px-2 font-semibold text-xs text-gray-500">
              <div>Code</div>
              <div>Point A</div>
              <div>Point B</div>
              <div>Device A</div>
              <div>Device B</div>
              <div>Port A</div>
              <div>Port B</div>
              <div />
            </div>
          )}

          <div className="flex flex-col gap-2">
            {flowFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr] gap-2 flex-1">
                  <MyInput
                    control={control}
                    name={`payload.update.flows.${index}.code`}
                    placeholder="22"
                    className="h-9 text-xs"
                  />
                  <MyInput
                    control={control}
                    name={`payload.update.flows.${index}.point_a`}
                    placeholder="Point A"
                    className="h-9 text-xs"
                  />
                  <MyInput
                    control={control}
                    name={`payload.update.flows.${index}.point_b`}
                    placeholder="Point B"
                    className="h-9 text-xs"
                  />
                  <MyInput
                    control={control}
                    name={`payload.update.flows.${index}.device_a`}
                    placeholder="Device A"
                    className="h-9 text-xs"
                  />
                  <MyInput
                    control={control}
                    name={`payload.update.flows.${index}.device_b`}
                    placeholder="Device B"
                    className="h-9 text-xs"
                  />
                  <MyInput
                    control={control}
                    name={`payload.update.flows.${index}.port_a`}
                    placeholder="554"
                    className="h-9 text-xs"
                  />
                  <MyInput
                    control={control}
                    name={`payload.update.flows.${index}.port_b`}
                    placeholder="47"
                    className="h-9 text-xs"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFlow(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              appendFlow({
                code: "",
                point_a: "",
                point_b: "",
                device_a: "",
                device_b: "",
                port_a: "",
                port_b: "",
              })
            }
            className="w-fit mt-2 flex items-center gap-2 border-dashed border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
          >
            <Plus size={16} /> Qator qo'shish
          </Button>
        </>
      )}
    </div>
  );
};

// ─── Delete section ──────────────────────────────────────────────────────────

const DeleteElementSection1212 = ({ control }: { control: Control<any> }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "payload.delete.elements",
  });

  return (
    <div className="mt-6 border p-6 my-2 rounded-xl bg-gray-50/50">
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
                  control={control}
                  name={`payload.delete.elements.${index}.value`}
                  placeholder="Masalan: 0023 yoki ID0024/1"
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
    </div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────

const OrderForm1212 = ({ control, watch }: OrderForm1212Props) => {
  const selectedActions: string[] = watch("payload.basic.actions") || [];

  const actionOptions = useMemo(
    () => [
      { label: "Tashkil etish", value: "create" },
      { label: "Ko'chirish", value: "update" },
      { label: "O'chirish", value: "delete" },
    ],
    [],
  );

  return (
    <>
      <div className="flex items-center justify-center gap-4 mb-8">
        <MyInput
          control={control}
          placeholder="Signal level"
          name="payload.basic.signal_level"
          className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
        />
        <p className="text-xl font-semibold">oqimni</p>
        <div className="w-[380px] text-left">
          <MySelect
            control={control}
            name="payload.basic.actions"
            options={actionOptions}
            placeholder="Tanlang..."
            isClearable
            isMulti
            required
          />
        </div>
        <p className="text-xl font-semibold">to'g'risida.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 my-8">
        <MyInput
          control={control}
          name="payload.basic.organization_name"
          placeholder="Temiyo'linfratuzilma"
          className="border border-t-0 border-l-0 border-r-0 rounded-none h-7 w-[300px]"
        />
        <div className="w-[130px]">
          <MyDatePicker name="payload.basic.request_date" control={control} />
        </div>
        <p>dagi</p>
        <div className="w-[100px]">
          <MyInput
            name="payload.basic.request_number"
            control={control}
            placeholder="№"
            className="border border-t-0 border-l-0 border-r-0 rounded-none h-6 py-0"
          />
        </div>
        <p>-son murojaatiga binoan</p>
        <div className="flex items-center gap-2 w-[165px]">
          <MyDatePicker name="payload.basic.start_time" control={control} />
          <span>dan</span>
        </div>
        <span>quyidagi ishlar amalga oshirilsin:</span>
      </div>
      <MyTextarea name="payload.basic.justification" control={control} placeholder="Izoh" />

      {/* CRUD sections — faqat tanlanganda ko'rinadi */}
      {selectedActions.includes("update") && (
        <UpdateFlowSection1212 control={control} />
      )}

      {selectedActions.includes("delete") && (
        <DeleteElementSection1212 control={control} />
      )}

      {selectedActions.includes("create") && (
        <CreateFlowSection1212 control={control} watch={watch} />
      )}
    </>
  );
};

export default OrderForm1212;


