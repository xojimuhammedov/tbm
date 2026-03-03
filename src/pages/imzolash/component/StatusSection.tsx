import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, XIcon, ClockIcon, UserCheckIcon } from "lucide-react";
import {DocumentStage, STAGES} from "@/pages/imzolash/constants/constants.ts";

interface StatusSectionProps {
    stage: DocumentStage;
    approvers: {
        responsible?: any;
        director?: any;
    };
    onCancelProcess: () => void;
}

export const StatusSection = ({ stage, approvers, onCancelProcess }: StatusSectionProps) => {
    const currentIdx = STAGES.findIndex((s) => s.id === stage);
    const isProcessStarted = stage !== "draft" && stage !== "done";

    return (
        <section className="space-y-4 mb-6">
            {/* --- Main Timeline Card --- */}
            <div className="bg-white rounded-[24px] border border-slate-200/60 shadow-xl shadow-slate-200/20 p-6 overflow-hidden relative">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Hujjat jarayoni</span>
                        <div className="flex items-center gap-2 mt-1">
                            <h2 className="text-lg font-extrabold text-slate-800">Status: {STAGES[currentIdx]?.label}</h2>
                            {isProcessStarted && (
                                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                            )}
                        </div>
                    </div>

                    {isProcessStarted && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onCancelProcess}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100 text-xs font-bold hover:bg-red-100 transition-colors"
                        >
                            <XIcon size={14} />
                            Jarayonni bekor qilish
                        </motion.button>
                    )}
                </div>

                <div className="relative flex justify-between px-2">
                    {/* Background Rail */}
                    <div className="absolute top-4 left-10 right-10 h-[3px] bg-slate-100 z-0 rounded-full" />

                    {/* Animated Progress Fill */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentIdx / (STAGES.length - 1)) * 100}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="absolute top-4 left-10 h-[3px] z-[1] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                    />

                    {STAGES.map((s, i) => {
                        const isDone = i < currentIdx;
                        const isActive = i === currentIdx;

                        return (
                            <div key={s.id} className="relative z-[2] flex flex-col items-center gap-3">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                        backgroundColor: isDone ? "#0f172a" : isActive ? "#fff" : "#fff",
                                        borderColor: isDone ? "#0f172a" : isActive ? "#3b82f6" : "#e2e8f0"
                                    }}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-sm transition-all`}
                                >
                                    {isDone ? (
                                        <CheckIcon size={18} className="text-white" strokeWidth={3} />
                                    ) : isActive ? (
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                                    )}
                                </motion.div>
                                <span className={`text-[11px] font-bold tracking-tight transition-colors ${
                                    isDone ? "text-slate-800" : isActive ? "text-blue-600" : "text-slate-400"
                                }`}>
                  {s.label}
                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- Approvers Info (Tagidagi qism) --- */}
            <AnimatePresence>
                {isProcessStarted && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                        <ApproverCard
                            role="Tasdiqlovchi"
                            user={approvers.responsible}
                            icon={<ClockIcon className="text-amber-500" size={16} />}
                            status="Ko'rib chiqilmoqda"
                        />
                        <ApproverCard
                            role="Direktor (Imzo)"
                            user={approvers.director}
                            icon={<UserCheckIcon className="text-slate-300" size={16} />}
                            status="Kutilmoqda"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const ApproverCard = ({ role, user, icon, status }: any) => (
    <div className="bg-white/60 backdrop-blur-sm border border-white border-b-slate-200/50 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-white flex items-center justify-center font-bold text-slate-500 shadow-sm">
                {user?.first_name?.[0]}{user?.second_name?.[0]}
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{role}</p>
                <p className="text-sm font-bold text-slate-700">{user?.first_name} {user?.second_name}</p>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/50 border border-slate-100">
                {icon}
                <span className="text-[11px] font-bold text-slate-600">{status}</span>
            </div>
        </div>
    </div>
);