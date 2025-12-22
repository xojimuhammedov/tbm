import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import {Num3ApplicationInterface} from "@/pages/rh-252/rh-3_3/interfaces/Num3.interface.ts";

const useApplicationDocumentB = (id: string) => {
    const applicationDocumentQuery = useGetOne<{
        data: Num3ApplicationInterface;
    }>({
        url: [URLS.RH_B_Application, id || ""],
        queryKey: [KEYS.RH_B_Application, id],
        options: {
            enabled: Boolean(id),
        },
    });
    return {
        applicationDocumentQuery,
    };
};

export default useApplicationDocumentB;