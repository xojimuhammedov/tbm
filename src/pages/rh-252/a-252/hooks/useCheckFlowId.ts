import { useQuery } from "@tanstack/react-query";
import { request } from "@/request";
import { useEffect } from "react";

interface UseCheckFlowIdOptions {
    idOrChannel: string;
    enabled?: boolean;
    onSuccess?: (isValid: boolean) => void;
}

const useCheckFlowId = ({
                            idOrChannel,
                            enabled = true,
                            onSuccess,
                        }: UseCheckFlowIdOptions) => {
    const query = useQuery({
        queryKey: ["check-flow-id", idOrChannel],
        queryFn: async () => {
            if (!idOrChannel || idOrChannel.trim() === "") return null;

            const res = await request.get<{ valid: boolean }>(
                `/api/rh-252/order/check`,
                {
                    params: {
                        idOrChannel: idOrChannel,
                        isEmpty: false,
                    }
                }
            );
            return res.data?.valid !== false;
        },
        enabled: enabled && !!idOrChannel && idOrChannel.trim() !== "",
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    useEffect(() => {
        if (query.isSuccess && query.data !== undefined && query.data !== null && onSuccess) {
            onSuccess(query.data);
        }
    }, [query.isSuccess, query.data, onSuccess]);

    // Xatolikni bartaraf qilish uchun:
    // Avval spread qilamiz, keyin o'zimizga xos (custom) nomlarni yozamiz
    return {
        ...query,
        isValid: query.data,
        // isLoading allaqachon query ichida bor, uni qayta yozish shart emas
        // lekin agar nomini o'zgartirmoqchi bo'lsangiz:
        isChecking: query.isLoading
    };
};

export default useCheckFlowId;