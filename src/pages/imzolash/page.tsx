// 'use client';
//
// import { useState } from 'react';
// import {
//     FileText,
//     Eye,
//     Send,
//     Clock,
//     CheckCircle2,
//     PenTool,
//     X,
//     AlertCircle,
// } from 'lucide-react';
// import { Card } from "dgz-ui";
// import {Button} from "dgz-ui/button";
//
// // Mock data
// const mockDocument = {
//     id: '1',
//     code: 'DOC-2026-001',
//     name: 'Xabarnoma 17-70 shakl',
//     createdBy: 'Abdullayev Asad',
//     responsible: 'Karimov Rustam',
//     createdAt: 'March 1, 2026 - 10:30 AM',
//     status: 'draft', // draft -> sent -> reviewed -> signed
//     reviewers: [
//         { id: '1', name: 'Ali Xolmirza', status: 'pending' },
//         { id: '2', name: 'Nozima Shodmonova', status: 'pending' },
//         { id: '3', name: 'Rustam Karimov', status: 'pending' },
//         { id: '4', name: 'Dilarom Fayziyeva', status: 'pending' },
//     ],
// };
//
// const WORKFLOW_STAGES = [
//     { id: 'draft', label: 'Tayyorgarlik', icon: FileText },
//     { id: 'sent', label: 'Jo\'natildi', icon: Send },
//     { id: 'reviewed', label: 'Ko\'rib chiqildi', icon: Eye },
//     { id: 'signed', label: 'Imzolandi', icon: PenTool },
// ];
//
// export default function DocumentWorkflow() {
//     const [document, setDocument] = useState(mockDocument);
//     const [showPdfModal, setShowPdfModal] = useState(false);
//     const [showReviewersModal, setShowReviewersModal] = useState(false);
//     const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
//     const [isSending, setIsSending] = useState(false);
//
//     const currentStageIndex = WORKFLOW_STAGES.findIndex(
//         (s) => s.id === document.status
//     );
//
//     const handleSelectReviewer = (reviewerId: string) => {
//         setSelectedReviewers((prev) =>
//             prev.includes(reviewerId)
//                 ? prev.filter((id) => id !== reviewerId)
//                 : [...prev, reviewerId]
//         );
//     };
//
//     const handleSendForReview = async () => {
//         if (selectedReviewers.length === 0) return;
//
//         setIsSending(true);
//         await new Promise((resolve) => setTimeout(resolve, 1500));
//
//         setDocument((prev) => ({
//             ...prev,
//             status: 'sent',
//             reviewers: prev.reviewers.map((r) => ({
//                 ...r,
//                 status: selectedReviewers.includes(r.id) ? 'pending' : 'skipped',
//             })),
//         }));
//
//         setShowReviewersModal(false);
//         setSelectedReviewers([]);
//         setIsSending(false);
//
//         // Simulate review completion after 3 seconds
//         setTimeout(() => {
//             setDocument((prev) => ({
//                 ...prev,
//                 status: 'reviewed',
//                 reviewers: prev.reviewers.map((r) =>
//                     r.status === 'pending' ? { ...r, status: 'completed' } : r
//                 ),
//             }));
//         }, 3000);
//     };
//
//     const handleSign = () => {
//         setDocument((prev) => ({
//             ...prev,
//             status: 'signed',
//         }));
//     };
//
//     const handleCancel = () => {
//         setDocument((prev) => ({
//             ...prev,
//             status: 'draft',
//             reviewers: prev.reviewers.map((r) => ({ ...r, status: 'pending' })),
//         }));
//         setSelectedReviewers([]);
//     };
//
//     const stageProgress = ((currentStageIndex + 1) / WORKFLOW_STAGES.length) * 100;
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 md:p-10">
//             <div className="max-w-5xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-12">
//                     <div className="flex items-center gap-3 mb-4">
//                         <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
//                             <div className="relative bg-white rounded-full p-2">
//                                 <FileText className="w-6 h-6 text-blue-600" />
//                             </div>
//                         </div>
//                         <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
//                             Hujjat Qayta Ishlash
//                         </h1>
//                     </div>
//                     <p className="text-slate-600 ml-11">
//                         Hujjatni ko'rib chiqish va imzolash jarayonini boshqaring
//                     </p>
//                 </div>
//
//                 {/* Progress Bar */}
//                 <Card className="mb-8 p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
//                     <div className="flex justify-between mb-6">
//                         {WORKFLOW_STAGES.map((stage, index) => {
//                             const isComplete = index < currentStageIndex;
//                             const isCurrent = index === currentStageIndex;
//                             const Icon = stage.icon;
//
//                             return (
//                                 <div key={stage.id} className="flex flex-col items-center flex-1">
//                                     {/* Stage indicator */}
//                                     <div
//                                         className={`relative mb-3 transition-all duration-500 transform ${
//                                             isCurrent ? 'scale-125' : 'scale-100'
//                                         }`}
//                                     >
//                                         <div
//                                             className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
//                                                 isComplete
//                                                     ? 'bg-gradient-to-r from-emerald-400 to-teal-500 border-teal-600 shadow-lg shadow-teal-300'
//                                                     : isCurrent
//                                                         ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-cyan-600 shadow-lg shadow-blue-300 animate-pulse'
//                                                         : 'bg-slate-100 border-slate-300'
//                                             }`}
//                                         >
//                                             <Icon
//                                                 className={`w-6 h-6 transition-colors ${
//                                                     isComplete || isCurrent
//                                                         ? 'text-white'
//                                                         : 'text-slate-400'
//                                                 }`}
//                                             />
//                                         </div>
//                                         {isCurrent && (
//                                             <div className="absolute inset-0 rounded-full animate-pulse border-2 border-blue-500 opacity-50"></div>
//                                         )}
//                                     </div>
//
//                                     {/* Stage label */}
//                                     <p
//                                         className={`text-xs md:text-sm font-semibold text-center transition-colors ${
//                                             isComplete || isCurrent
//                                                 ? 'text-slate-900'
//                                                 : 'text-slate-500'
//                                         }`}
//                                     >
//                                         {stage.label}
//                                     </p>
//                                 </div>
//                             );
//                         })}
//                     </div>
//
//                     {/* Progress line */}
//                     <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
//                         <div
//                             className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
//                             style={{ width: `${stageProgress}%` }}
//                         ></div>
//                     </div>
//                 </Card>
//
//                 {/* Document Info */}
//                 <Card className="mb-8 p-8 shadow-lg border-0 bg-white/80 backdrop-blur">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//                         <div className="space-y-6">
//                             <div className="group">
//                                 <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">
//                                     Hujjat Kodi
//                                 </label>
//                                 <p className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
//                                     {document.code}
//                                 </p>
//                             </div>
//
//                             <div className="group">
//                                 <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">
//                                     Hujjat Nomi
//                                 </label>
//                                 <p className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
//                                     {document.name}
//                                 </p>
//                             </div>
//
//                             <div className="group">
//                                 <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">
//                                     Kim Yaratgani
//                                 </label>
//                                 <p className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
//                                     {document.createdBy}
//                                 </p>
//                             </div>
//                         </div>
//
//                         <div className="space-y-6">
//                             <div className="group">
//                                 <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">
//                                     Ma'sul Xodim
//                                 </label>
//                                 <p className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
//                                     {document.responsible}
//                                 </p>
//                             </div>
//
//                             <div className="group">
//                                 <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">
//                                     Yaratilgan Vaqt
//                                 </label>
//                                 <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
//                                     <Clock className="w-4 h-4" />
//                                     {document.createdAt}
//                                 </div>
//                             </div>
//
//                             <div className="group">
//                                 <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">
//                                     Holati
//                                 </label>
//                                 <div
//                                     className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
//                                         document.status === 'draft'
//                                             ? 'bg-slate-200 text-slate-900'
//                                             : document.status === 'sent'
//                                                 ? 'bg-blue-200 text-blue-900'
//                                                 : document.status === 'reviewed'
//                                                     ? 'bg-cyan-200 text-cyan-900'
//                                                     : 'bg-emerald-200 text-emerald-900'
//                                     }`}
//                                 >
//                                     {document.status === 'draft'
//                                         ? 'Tayyorgarlik'
//                                         : document.status === 'sent'
//                                             ? 'Jo\'natildi'
//                                             : document.status === 'reviewed'
//                                                 ? 'Ko\'rib chiqildi'
//                                                 : 'Imzolandi'}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* PDF Preview Button */}
//                     <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
//                         <button
//                             onClick={() => setShowPdfModal(true)}
//                             className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//                         >
//                             <Eye className="w-5 h-5" />
//                             PDF Ko'rish
//                         </button>
//                         <p className="text-sm text-slate-600">
//                             Hujjatni PDF formatda ko'rish uchun
//                         </p>
//                     </div>
//                 </Card>
//
//                 {/* Actions */}
//                 <div className="flex flex-col md:flex-row gap-4">
//                     {document.status === 'draft' && (
//                         <Button
//                             onClick={() => setShowReviewersModal(true)}
//                             className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                         >
//                             <Send className="w-5 h-5 mr-2" />
//                             Ko'rib chiqishga Jo'natish
//                         </Button>
//                     )}
//
//                     {document.status === 'reviewed' && (
//                         <Button
//                             onClick={handleSign}
//                             className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                         >
//                             <PenTool className="w-5 h-5 mr-2" />
//                             Imzolash
//                         </Button>
//                     )}
//
//                     {document.status === 'sent' && (
//                         <div className="flex-1 flex items-center gap-3 px-6 py-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
//                             <Clock className="w-5 h-5 text-blue-600 animate-spin" />
//                             <div>
//                                 <p className="font-semibold text-blue-900">Ko'rib chiqilmoqda</p>
//                                 <p className="text-sm text-blue-700">
//                                     {
//                                         document.reviewers.filter((r) => r.status === 'pending')
//                                             .length
//                                     }{' '}
//                                     ta xodim ko'rib chiqmoqda
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={handleCancel}
//                                 className="ml-auto text-blue-700 hover:text-blue-900 transition-colors"
//                             >
//                                 <X className="w-5 h-5" />
//                             </button>
//                         </div>
//                     )}
//
//                     {document.status === 'signed' && (
//                         <div className="flex-1 flex items-center gap-3 px-6 py-3 bg-emerald-50 border-2 border-emerald-300 rounded-lg">
//                             <CheckCircle2 className="w-5 h-5 text-emerald-600" />
//                             <div>
//                                 <p className="font-semibold text-emerald-900">Yakunlandi</p>
//                                 <p className="text-sm text-emerald-700">
//                                     Hujjat muvaffaqiyatli imzolandi
//                                 </p>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Reviewers List */}
//                 {document.status !== 'draft' && (
//                     <Card className="mt-8 p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
//                         <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
//                             <Eye className="w-5 h-5 text-blue-600" />
//                             Ko'rib chiquvchilar
//                         </h3>
//                         <div className="space-y-3">
//                             {document.reviewers.map((reviewer) => (
//                                 <div
//                                     key={reviewer.id}
//                                     className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
//                                         reviewer.status === 'completed'
//                                             ? 'bg-emerald-50 border-emerald-300'
//                                             : reviewer.status === 'pending'
//                                                 ? 'bg-blue-50 border-blue-300 animate-pulse'
//                                                 : 'bg-slate-50 border-slate-300'
//                                     }`}
//                                 >
//                   <span
//                       className={`font-semibold ${
//                           reviewer.status === 'completed'
//                               ? 'text-emerald-900'
//                               : reviewer.status === 'pending'
//                                   ? 'text-blue-900'
//                                   : 'text-slate-600'
//                       }`}
//                   >
//                     {reviewer.name}
//                   </span>
//                                     <div
//                                         className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
//                                             reviewer.status === 'completed'
//                                                 ? 'bg-emerald-200 text-emerald-900'
//                                                 : reviewer.status === 'pending'
//                                                     ? 'bg-blue-200 text-blue-900'
//                                                     : 'bg-slate-200 text-slate-600'
//                                         }`}
//                                     >
//                                         {reviewer.status === 'completed' ? (
//                                             <>
//                                                 <CheckCircle2 className="w-3 h-3" />
//                                                 Ko'rib chiqildi
//                                             </>
//                                         ) : reviewer.status === 'pending' ? (
//                                             <>
//                                                 <Clock className="w-3 h-3 animate-spin" />
//                                                 Kutilmoqda
//                                             </>
//                                         ) : (
//                                             'O\'tkazib yuborildi'
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </Card>
//                 )}
//             </div>
//
//             {/* PDF Modal */}
//             {showPdfModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//                     <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col border-0 shadow-2xl">
//                         <div className="flex items-center justify-between p-6 border-b border-slate-200">
//                             <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//                                 <FileText className="w-5 h-5 text-red-600" />
//                                 PDF Ko'rish: {document.code}
//                             </h2>
//                             <button
//                                 onClick={() => setShowPdfModal(false)}
//                                 className="text-slate-400 hover:text-slate-900 transition-colors"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>
//
//                         <div className="flex-1 overflow-auto bg-gradient-to-b from-slate-100 to-slate-200 p-6">
//                             <div className="bg-white rounded-lg shadow-2xl p-12 mx-auto max-w-2xl min-h-[600px] space-y-4 font-serif text-slate-900">
//                                 <div className="text-center border-b-2 border-slate-300 pb-4">
//                                     <h3 className="text-2xl font-bold">O'ZBEKISTON RESPUBLIKASI</h3>
//                                     <p className="text-sm text-slate-600">RAQAMLI TEXNOLOGIYALAR VAZIRLIGI</p>
//                                 </div>
//
//                                 <div className="text-center space-y-2 py-6">
//                                     <p className="text-lg font-bold">XABARNOMA</p>
//                                     <div className="flex justify-between text-sm">
//                                         <span>SANA: 2026-03-01</span>
//                                         <span>№ {document.code}</span>
//                                         <span>SONI: 1</span>
//                                     </div>
//                                 </div>
//
//                                 <div className="space-y-3 text-sm leading-relaxed">
//                                     <p>
//                                         <strong>Kimga:</strong> {document.responsible}
//                                     </p>
//                                     <p>
//                                         <strong>Nusxasi:</strong> Taqdim etish uchun
//                                     </p>
//
//                                     <div className="border-t-2 border-slate-300 pt-4 mt-6">
//                                         <p className="font-bold text-center mb-3">
//                                             Telekommunikatsiya Xizmatlari Haqida
//                                         </p>
//                                         <p>
//                                             Bu xabarnoma kompaniyaning telekommunikatsiya xizmatlari
//                                             to'g'risidagi ma'lumotlarni o'z ichiga oladi. Barcha
//                                             shuhodlik esnaflar 17-70 shakliga muvofiq tayyorlangan.
//                                         </p>
//                                     </div>
//                                 </div>
//
//                                 <div className="mt-12 pt-6 border-t-2 border-slate-300 space-y-4 text-sm">
//                                     <div className="flex justify-between">
//                                         <span>Mas'ul xodim:</span>
//                                         <span className="border-b border-slate-300 w-48"></span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>Direktor:</span>
//                                         <span className="border-b border-slate-300 w-48"></span>
//                                     </div>
//                                 </div>
//
//                                 <div className="mt-8 pt-4 border-t border-slate-300 text-xs text-slate-600">
//                                     <p>Yaratuvchi: {document.createdBy}</p>
//                                     <p>Yaratilgan: {document.createdAt}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </Card>
//                 </div>
//             )}
//
//             {/* Reviewers Selection Modal */}
//             {showReviewersModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//                     <Card className="w-full max-w-2xl border-0 shadow-2xl">
//                         <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50">
//                             <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//                                 <Eye className="w-5 h-5 text-blue-600" />
//                                 Ko'rib chiqishga Jo'natish
//                             </h2>
//                             <button
//                                 onClick={() => {
//                                     setShowReviewersModal(false);
//                                     setSelectedReviewers([]);
//                                 }}
//                                 className="text-slate-400 hover:text-slate-900 transition-colors"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>
//
//                         <div className="p-6">
//                             <p className="text-slate-600 mb-4">
//                                 Ushbu hujjatni ko'rib chiqish uchun xodimlarni tanlang:
//                             </p>
//
//                             <div className="space-y-3 mb-6">
//                                 {document.reviewers.map((reviewer) => (
//                                     <label
//                                         key={reviewer.id}
//                                         className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all"
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedReviewers.includes(reviewer.id)}
//                                             onChange={() => handleSelectReviewer(reviewer.id)}
//                                             className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 cursor-pointer accent-blue-600"
//                                         />
//                                         <span className="font-semibold text-slate-900">
//                       {reviewer.name}
//                     </span>
//                                     </label>
//                                 ))}
//                             </div>
//
//                             {selectedReviewers.length === 0 && (
//                                 <div className="flex items-center gap-3 p-4 bg-amber-50 border-2 border-amber-300 rounded-lg mb-6">
//                                     <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
//                                     <p className="text-sm text-amber-900">
//                                         Ko'rib chiquvchilarni tanlang
//                                     </p>
//                                 </div>
//                             )}
//
//                             <div className="flex gap-3">
//                                 <Button
//                                     onClick={() => {
//                                         setShowReviewersModal(false);
//                                         setSelectedReviewers([]);
//                                     }}
//                                     variant="default"
//                                     className="flex-1 h-10"
//                                 >
//                                     Bekor Qilish
//                                 </Button>
//                                 <Button
//                                     onClick={handleSendForReview}
//                                     disabled={selectedReviewers.length === 0 || isSending}
//                                     className="flex-1 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold disabled:opacity-50"
//                                 >
//                                     {isSending ? (
//                                         <>
//                                             <Clock className="w-4 h-4 mr-2 animate-spin" />
//                                             Jo'natilmoqda...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Send className="w-4 h-4 mr-2" />
//                                             Jo'natish ({selectedReviewers.length})
//                                         </>
//                                     )}
//                                 </Button>
//                             </div>
//                         </div>
//                     </Card>
//                 </div>
//             )}
//         </div>
//     );
// }


import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import { CARD_INDEXES_QUERY_KEY } from "@/pages/card-indexes/constants/card-indexes.constants.ts";
import { CardIndexInterface } from "@/pages/card-indexes/interfaces/card-index.interface.ts";
import useCardIndexes from "@/pages/card-indexes/hooks/useCardIndexes.ts";

const Page = () => {
    const { t } = useTranslation();
    const { loading, columns, dataSource, handleFilter, params, handleAdd } =
        useCardIndexes();
    const breadcrumbs = useMemo<BreadcrumbInterface[]>(
        () => [
            {
                name: t("Card index"),
                path: "/card-indexes",
                isActive: true,
            },
        ],
        [t],
    );
    return (
        <>
            <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
                <Button size={"sm"} onClick={handleAdd}>
                    <CirclePlusIcon />
                    {t("Add new")}
                </Button>
            </PageHeader>
            <PageWrapper>
                <DataTable<CardIndexInterface, PaginationInterface<CardIndexInterface>>
                    tableKey={CARD_INDEXES_QUERY_KEY}
                    hasNumbers
                    hasSearch
                    isStickyHeader
                    hasPagination
                    loading={loading}
                    params={params}
                    onParamChange={handleFilter}
                    rowKey={"_id"}
                    dataSource={dataSource}
                    dataKey={"docs"}
                    columns={columns}
                />
            </PageWrapper>
        </>
    );
};

export default Page;
