import { request } from '@/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const deleteRequest = (url: string) => request.delete(url);

const useDeleteQuery = ({ listKeyId }: any) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const { mutate, isError, error } = useMutation<
        unknown,
        Error,
        { url: string }
    >({
        mutationFn: ({ url }) => deleteRequest(url),
        onSuccess: (data: any) => {
            toast.success(data?.data?.message || t('SUCCESSFULLY DELETED'));

            if (listKeyId) {
                queryClient.invalidateQueries(listKeyId);
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.message || 'ERROR');
        }
    });

    return {
        mutate,
        isError,
        error
    };
};

export default useDeleteQuery;
