const fs = require("fs");

// Create the summarized card component
const content = `import { Card } from "dgz-ui";
import { useTranslation } from "react-i18next";
import { FileTextIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";

interface StatusCardsProps {
    data: any[];
}

export const StatusCards = ({ data }: StatusCardsProps) => {
    const { t } = useTranslation();

    let pending = 0;
    let accepted = 0;
    let rejected = 0;
    let total = data?.length || 0;

    if (Array.isArray(data)) {
        data.forEach(item => {
            const status = item.document_status || item.status;
            if (status === 'PENDING') pending++;
            else if (status === 'ACCEPTED' || status === 'SIGNED' || status === 'DONE') accepted++;
            else if (status === 'REJECTED') rejected++;
        });
    }

    const cards = [
        {
            title: t("Yangi hujjatlar"),
            count: total,
            icon: <FileTextIcon className="size-6 text-blue-500" />,
            bg: "bg-blue-50",
            border: "border-blue-100"
        },
        {
            title: t("Tasdiqlanganlar"),
            count: accepted,
            icon: <CheckCircleIcon className="size-6 text-green-500" />,
            bg: "bg-green-50",
            border: "border-green-100"
        },
        {
            title: t("Ko'rib chiqilayotganlar"),
            count: pending,
            icon: <ClockIcon className="size-6 text-orange-500" />,
            bg: "bg-orange-50",
            border: "border-orange-100"
        },
        {
            title: t("Rad etilganlar"),
            count: rejected,
            icon: <XCircleIcon className="size-6 text-red-500" />,
            bg: "bg-red-50",
            border: "border-red-100"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card, idx) => (
                <div key={idx} className={\`p-5 rounded-2xl border flex items-center gap-4 \${card.bg} \${card.border}\`}>
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                        <p className="text-2xl font-bold text-gray-800">{card.count}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
`;

fs.writeFileSync(
  "c:/Users/zuxrd/OneDrive/Рабочий стол/tbm/src/pages/agreement-decrees/components/StatusCards.tsx",
  content,
  "utf8",
);
