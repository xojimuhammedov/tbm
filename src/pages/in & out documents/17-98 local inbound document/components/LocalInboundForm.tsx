import {Form, MyInput} from "dgz-ui-shared/components/form";
import {useTranslation} from "react-i18next";
import {FormContainerFooter} from "@/shared/components/templates/form";
import {Button} from "dgz-ui/button";
import {ArrowLeftIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";
import useLocalInboundForm from "@/pages/in & out documents/17-98 local inbound document/hooks/useLocalInboundForm.ts";
import {
    LocalInboundDto
} from "@/pages/in & out documents/17-98 local inbound document/schemas/createLocalInboundSchema.ts";

interface LocalInboundFormProps {
    id: string | null;
    onSave?: () => void;
    readOnly?: boolean;
}

const LocalInboundForm = ({id, onSave, readOnly = false}: LocalInboundFormProps) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {form, onSubmit} = useLocalInboundForm({id, onSave});

    const title = id
        ? `${t("Tahrirlash")} ${t("Kiruvchi hujjatlar")}`
        : `${t("Yaratish")} ${t("Kiruvchi hujjatlar")}`;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
                <h2 className={"text-xl font-medium"}>{title}</h2>

                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    <MyInput<LocalInboundDto>
                        control={form.control}
                        name={"reg_num"}
                        label={"1. Bo‘limda ro‘yxatdan o‘tgan tartib raqami"}
                        placeholder={t("Tartib raqami")}
                        required
                        disabled={readOnly}
                    />
                    <MyInput<LocalInboundDto>
                        control={form.control}
                        name={"reg_date"}
                        label={"2. Sana"}
                        type="date"
                        required
                        disabled={readOnly}
                    />
                    <MyInput<LocalInboundDto>
                        control={form.control}
                        name={"journal_index"}
                        label={"4. Jurnal indeksi"}
                        placeholder={t("Jurnal indeksi")}
                        required
                        disabled={readOnly}
                    />
                    <MyInput<LocalInboundDto>
                        control={form.control}
                        name={"recipient"}
                        label={"3. Kimdan kelib tushgan hujjat va uning raqami"}
                        placeholder={t("Yuboruvchi ma'lumotlari")}
                        required
                        disabled={readOnly}
                    />
                    <MyInput<LocalInboundDto>
                        control={form.control}
                        name={"summary"}
                        label={"5. Hujjatning qisqa mazmuni"}
                        placeholder={t("Qisqa mazmun")}
                        required
                        disabled={readOnly}
                    />
                </div>
                {!readOnly && (
                    <FormContainerFooter>
                        <Button
                            size={"sm"}
                            variant={"ghost"}
                            type={"button"}
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeftIcon className="mr-2 h-4 w-4"/>
                            {t("Back")}
                        </Button>
                    </FormContainerFooter>
                )}
            </form>
        </Form>
    );
};

export default LocalInboundForm;