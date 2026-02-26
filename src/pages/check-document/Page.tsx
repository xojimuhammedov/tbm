import { PageWrapper } from "@/shared/components/containers/page";
import { PageHeader } from "@/shared/components/templates/title";
import { DateRangeFilter } from "@/shared/components/templates/filters";
import { DASHBOARD_QUERY_KEY } from "@/pages/dashboard/constants/dashboard.constants.ts";
import { DATE } from "@/shared/constants/date.constants.ts";
import { useEffect, useState } from 'react'; // useState qo'shildi
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Page = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [docData, setDocData] = useState(null);
    const docId = searchParams.get('doc_id');
    const sig = searchParams.get('sig');

    useEffect(() => {
        if (docId && sig) {
            axios.post('https://eresurs.rtmc.uz/check-document', {
                document_id: docId,
                signature: sig
            })
                .then(res => {
                    console.log("Hujjat tasdiqlandi:", res.data);
                    setDocData(res.data);
                    setStatus('success');
                })
                .catch(err => {
                    console.error("Xatolik:", err);
                    setStatus('error');
                });
        } else {
            setStatus('error');
        }
    }, [docId, sig]);

    return (
        <>
            <PageHeader title="Hujjatni tekshirish">
                <DateRangeFilter dateKey={DASHBOARD_QUERY_KEY} format={DATE} />
            </PageHeader>

            <PageWrapper className="gap-4 flex flex-col items-center justify-center p-10">
                {status === 'loading' && (
                    <div className="text-blue-500 animate-pulse">
                        🔍 Hujjat ma'lumotlari tekshirilmoqda, iltimos kuting...
                    </div>
                )}

                {status === 'success' && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Tasdiqlandi!</strong>
                        <p className="block sm:inline"> Hujjat haqiqiy va tizimdan o'tdi.</p>
                        {/* Bu yerda docData ichidagi ma'lumotlarni chiqarsangiz bo'ladi */}
                        <pre className="mt-4 text-xs">{JSON.stringify(docData, null, 2)}</pre>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Xatolik!</strong>
                        <p className="block sm:inline"> Hujjat topilmadi yoki imzo noto'g'ri.</p>
                    </div>
                )}
            </PageWrapper>
        </>
    );
};

export default Page;