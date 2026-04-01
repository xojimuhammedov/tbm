import { Control } from "react-hook-form";
import {
  MyInput,
  MySelect,
  MyDatePicker,
} from "dgz-ui-shared/components/form";
import { useMemo } from "react";
import useLists from "@/shared/hooks/useLists";
import { FLOWS_ID_QUERY_KEY } from "@/pages/flows-id/constants/flows.constants";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface";
import { CHANNELS_ID_QUERY_KEY } from "@/pages/channels-id/constants/channels.constants";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface";
import IDSection1731 from "./NetworkDoc";

interface BlockActionSectionProps {
  control: Control<any>;
  setValue: (name: string, value: any, options?: any) => void;
}

const BlockActionSection = ({ control, setValue }: BlockActionSectionProps) => {
  const { query: flowsQuery } = useLists<FlowInterface>({
    url: [FLOWS_ID_QUERY_KEY],
    defaultParams: { page: 1, limit: 1000 },
  });

  const { query: channelsQuery } = useLists<ChannelInterface>({
    url: [CHANNELS_ID_QUERY_KEY],
    defaultParams: { page: 1, limit: 1000 },
  });

  const flowOptions = useMemo(
    () =>
      flowsQuery.data?.docs?.map((item) => ({
        label: item.code,
        value: item.code,
      })) || [],
    [flowsQuery.data],
  );

  const channelOptions = useMemo(
    () =>
      channelsQuery.data?.docs?.map((item) => ({
        label: item.code,
        value: item.code,
      })) || [],
    [channelsQuery.data],
  );

  const directionOptions = [
    { label: "global", value: "global" },
    { label: "local", value: "local" },
  ];

  const actionTypeOptions = [
    { label: "bloklansin", value: "block" },
    { label: "blokdan chiqarilsin", value: "unblock" },
  ];

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
