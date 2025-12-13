import useLists from "@/shared/hooks/useLists.ts";
import { useMemo } from "react";
import { FLOWS_ID_QUERY_KEY } from "@/pages/flows-id/constants/flows.constants.ts";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface.ts";

const useFlowsOptions = () => {
  const { query } = useLists<FlowInterface>({
    url: [FLOWS_ID_QUERY_KEY],
    defaultParams: { page: 1, limit: 100 },
  });

  const flowMbbOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: item.interest_level,
        value: item.interest_level,
      })),
    [query.data],
  );

  return {
    flowMbbOptions,
  };
};

export default useFlowsOptions;
