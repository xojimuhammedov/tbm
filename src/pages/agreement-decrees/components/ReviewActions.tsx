import React, { useState } from "react";
import { Button } from "dgz-ui/button";
import { useReviewDocument } from "../hooks/useReviewDocument";

interface ReviewActionsProps {
    id: string;
    onSuccess?: () => void;
}

export const ReviewActions: React.FC<ReviewActionsProps> = ({ id, onSuccess }) => {
    const [isRejecting, setIsRejecting] = useState(false);
    const [comment, setComment] = useState("");

    const { reviewQuery, isPending } = useReviewDocument(id, () => {
        setIsRejecting(false);
        setComment("");
        if (onSuccess) onSuccess();
    });

    const handleApprove = () => {
        reviewQuery.mutate({
            status: "ACCEPTED",
        });
    };

    const handleReject = () => {
        if (!comment.trim()) return;
        reviewQuery.mutate({
            status: "REJECTED",
            comment,
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit flex flex-col gap-4">
            <div className="flex flex-col border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-[15px] text-slate-900 leading-snug tracking-tight">
                    Harakatlar
                </h3>
                <p className="text-[12px] text-slate-500 mt-1">
                    Hujjatni tasdiqlang yoki sabab ko'rsatgan holda rad eting.
                </p>
            </div>

            {!isRejecting ? (
                <div className="flex gap-3 mt-2">
                    <Button
                        onClick={() => setIsRejecting(true)}
                        disabled={isPending}
                        variant="secondary"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-semibold"
                    >
                        Rad etish
                    </Button>
                    <Button
                        onClick={handleApprove}
                        disabled={isPending}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold"
                    >
                        Tasdiqlash
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-3 mt-2">
                    <textarea
                        className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none shadow-sm"
                        rows={4}
                        placeholder="Rad etish sababini kiriting..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={() => setIsRejecting(false)}
                            disabled={isPending}
                            variant="secondary"
                            className="flex-1 text-slate-700 hover:bg-slate-50 font-semibold border-slate-200"
                        >
                            Bekor qilish
                        </Button>
                        <Button
                            onClick={handleReject}
                            disabled={isPending || !comment.trim()}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm"
                        >
                            Yuborish
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
