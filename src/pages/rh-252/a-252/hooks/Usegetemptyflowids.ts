import { useQuery } from "@tanstack/react-query";
import { request } from "@/request";
import { useEffect } from "react";

interface UseGetEmptyFlowIdsOptions {
    count: number;
    enabled?: boolean;
    onSuccess?: (data: string[]) => void;
}

const useGetEmptyFlowIds = ({
                                count,
                                enabled = true,
                                onSuccess,
                            }: UseGetEmptyFlowIdsOptions) => {
    const query = useQuery<string[]>({
        queryKey: ["empty-flow-ids", count],
        queryFn: async () => {
            const res = await request.get<string[]>("/api/flows-id/empty-id-numbers", {
                params: { count },
            });
            return res.data;
        },
        enabled: enabled && count > 0,
        staleTime: 0,
    });

    useEffect(() => {
        if (query.isSuccess && query.data && onSuccess) {
            onSuccess(query.data);
        }
    }, [query.isSuccess, query.data, onSuccess]);

    return query;
};

export default useGetEmptyFlowIds;