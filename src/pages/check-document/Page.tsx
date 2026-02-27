import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Clock, User, ShieldCheck, FileText, Calendar } from 'lucide-react';

interface IDocData {
    success: boolean;
    message: string;
    data: {
        signature_info: {
            signed_at: string;
            cert_serial_number: string;
            cert_valid_from: string;
            cert_valid_to: string;
            issuer_name: string;
        };
        signed_from: {
            full_name: string;
        };
        responsible: {
            full_name: string;
        };
        director: {
            full_name: string;
        };
    };
}

const Page = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [docData, setDocData] = useState<IDocData | null>(null);
    const docId = searchParams.get('id');
    const sig = searchParams.get('sig');

    useEffect(() => {
        if (docId && sig) {
            axios.get<IDocData>('https://eresurs.rtmc.uz/api/rh-252/orderv2/check-qr-code', {
                params: { id: docId, sig: sig }
            })
                .then(res => {
                    setDocData(res.data);
                    setStatus('success');
                })
                .catch(() => setStatus('error'));
        } else {
            setStatus('error');
        }
    }, [docId, sig]);

    const formatDate = (dateString: string | Date | undefined) => {
        if (!dateString) return "Mavjud emas";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Noto'g'ri sana";

        return new Intl.DateTimeFormat('uz-UZ', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date).replace(/\//g, '.');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 sm:py-12 px-4">
            <div className="w-full max-w-3xl">

                {/* --- YUKLANMOQDA --- */}
                {status === 'loading' && (
                    <div className="flex flex-col items-center justify-center p-10 sm:p-20 space-y-4 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                        <p className="text-gray-600 animate-pulse font-medium text-sm sm:text-base">
                            Hujjat ma'lumotlari tekshirilmoqda...
                        </p>
                    </div>
                )}

                {/* --- MUVAFFAQIYAT --- */}
                {status === 'success' && docData && (
                    <div className="bg-white shadow-xl rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100">
                        {/* Header: Mobil uchun moslashuvchan */}
                        <div className="bg-green-600 p-4 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-center sm:text-left">
                                <CheckCircle className="shrink-0 w-8 h-8 sm:w-10 sm:h-10" />
                                <div>
                                    <h1 className="text-lg sm:text-xl font-bold italic tracking-wide uppercase">Hujjat tasdiqlandi</h1>
                                    <p className="text-xs sm:text-sm opacity-90">Elektron raqamli imzo haqiqiy</p>
                                </div>
                            </div>
                            <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-green-500 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto">
                                <p className="text-[10px] uppercase opacity-75">Hozirgi vaqt</p>
                                <p className="text-xs sm:text-sm font-semibold">{formatDate(new Date())}</p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                            {/* 1. Mas'ul shaxslar seksiyasi */}
                            <section>
                                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                                    <User className="text-blue-600 shrink-0" size={18} />
                                    <h2 className="font-semibold text-gray-800 text-sm sm:text-base">Mas'ul shaxslar</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Imzoladi (ERI egasi):</p>
                                        <p className="text-gray-900 font-medium mt-1 text-xs sm:text-sm uppercase break-words">
                                            {docData.data.signed_from?.full_name || "Noma'lum"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Mas'ul xodim:</p>
                                        <p className="text-gray-900 font-medium mt-1 text-xs sm:text-sm uppercase break-words">
                                            {docData.data.responsible?.full_name || "Noma'lum"}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Sertifikat ma'lumotlari seksiyasi */}
                            <section>
                                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                                    <ShieldCheck className="text-blue-600 shrink-0" size={18} />
                                    <h2 className="font-semibold text-gray-800 text-sm sm:text-base">Sertifikat ma'lumotlari</h2>
                                </div>
                                <div className="space-y-3 bg-gray-50/50 p-3 sm:p-5 rounded-lg sm:rounded-xl border border-gray-100 text-xs sm:text-sm">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                        <span className="text-gray-500 flex items-center gap-2"><Clock size={14}/> Imzolangan vaqt:</span>
                                        <span className="font-medium text-gray-900 ml-6 sm:ml-0">{formatDate(docData.data.signature_info?.signed_at)}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                        <span className="text-gray-500 flex items-center gap-2"><FileText size={14}/> Sertifikat seriyasi:</span>
                                        <span className="font-mono bg-blue-50 px-2 py-0.5 rounded text-blue-700 font-bold w-fit ml-6 sm:ml-0">
                                            {docData.data.signature_info?.cert_serial_number}
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                        <span className="text-gray-500 flex items-center gap-2"><Calendar size={14}/> Amal qilish muddati:</span>
                                        <span className="text-gray-700 font-medium ml-6 sm:ml-0">
                                            {new Date(docData.data.signature_info?.cert_valid_from).toLocaleDateString('uz-UZ')} — {new Date(docData.data.signature_info?.cert_valid_to).toLocaleDateString('uz-UZ')}
                                        </span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200 mt-2">
                                        <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold mb-1">Sertifikat beruvchi:</p>
                                        <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-500 italic break-words bg-white/50 p-2 rounded">
                                            {docData.data.signature_info?.issuer_name}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-100 p-4 text-center border-t border-gray-200">
                            <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                                RTMC Elektron Hujjatlarni Tasdiqlash Tizimi
                            </p>
                        </div>
                    </div>
                )}

                {/* --- XATOLIK --- */}
                {status === 'error' && (
                    <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 border-t-4 border-red-500 flex flex-col items-center text-center">
                        <div className="bg-red-50 p-3 sm:p-4 rounded-full mb-4">
                            <XCircle size={40} className="text-red-500 sm:w-12 sm:h-12" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Hujjat tasdiqlanmadi</h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-sm mb-6">
                            Kechirasiz, ushbu QR kod orqali hujjat topilmadi yoki uning imzosi haqiqiy emas.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-all shadow-lg active:scale-95 text-sm font-medium"
                        >
                            Qayta tekshirish
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;