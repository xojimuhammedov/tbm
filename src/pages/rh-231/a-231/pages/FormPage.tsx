import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, Save } from "lucide-react";
import { Button } from "dgz-ui/button";
import { Form, MyInput, MyTextarea } from "dgz-ui-shared/components/form";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useA231DocumentForm from "@/pages/rh-231/a-231/hooks/useApplicationDocumentForm.ts";

const BypassScheduleForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();

    const { form, isLoading, onSubmit } = useA231DocumentForm({
        id,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="max-w-5xl mx-auto p-8 bg-white text-black shadow-sm">
                    <div className="text-right mb-2">
                        <p className="text-sm font-semibold">3.2-шакл</p>
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-xl font-bold uppercase">
                            Айланиб ўтиш ва алмаштиришлар графиги
                        </h1>
                    </div>

                    <table className="w-full border-collapse border border-black text-sm">
                        <tbody>
                        <tr>
                            <td className="border border-black p-2 w-[60%] font-medium">График номери</td>
                            <td className="border border-black p-2 text-center w-[5%] font-bold">1</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="graphNumber" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>

                        <tr>
                            <td className="border border-black p-2 font-medium">Ушбу айланиб ўтишдан фойдаланиладиган графиклар пунктларининг рўйхати</td>
                            <td className="border border-black p-2 text-center font-bold">2</td>
                            <td className="border border-black p-1">
                                <MyTextarea control={form.control} name="usedGraphPoints" className="border-none focus:ring-0 min-h-[60px]" />
                            </td>
                        </tr>

                        <tr>
                            <td className="border border-black p-2 font-medium">Тикланадиган НО учун қўлланадиган автоматик резервлаш принципи</td>
                            <td className="border border-black p-2 text-center font-bold">3</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="autoReservePrinciple" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3} className="border border-black p-0">
                                <div className="flex h-full min-h-[250px]">
                                    <div className="[writing-mode:vertical-lr] rotate-180 border-l border-black p-3 flex items-center justify-center font-bold  uppercase tracking-wider">
                                        Асосий трасса
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="p-2 border-b border-black h-[60px] flex items-center">Фойдаланилган НО тури, алоқа номери</div>
                                        <div className="p-2 border-b border-black flex-1 flex items-center justify-center">
                                            <span className="[writing-mode:vertical-lr] rotate-180 text-center font-medium">Тракт (канал)нинг НО трассаси</span>
                                        </div>
                                        <div className="p-2 h-[50px] flex items-center">Ўзаро ишлаш рақами</div>
                                    </div>
                                </div>
                            </td>
                            <td className="border border-black p-2 text-center font-bold">4</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="usedHOTypeAndLink" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 text-center font-bold">5</td>
                            <td className="border border-black p-1">
                                <MyTextarea control={form.control} name="mainHoTrack" className="border-none focus:ring-0 h-full min-h-[120px]" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 text-center font-bold">6</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="mainInteractionNumber" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>

                        {/* AYLANIB O'TILADIGAN TRASSA SECTION */}
                        <tr>
                            <td rowSpan={3} className="border border-black p-0">
                                <div className="flex h-full min-h-[250px]">
                                    <div className="[writing-mode:vertical-lr] rotate-180 border-l  border-black p-3 flex items-center justify-center font-bold  uppercase tracking-wider text-center">
                                        Айланиб ўтиладиган трасса
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="p-2 border-b border-black flex-1 flex items-center justify-center">
                                            <span className="[writing-mode:vertical-lr] rotate-180 text-center font-medium">Тракт (канал)нинг НО трассаси</span>
                                        </div>
                                        <div className="p-2 border-b border-black h-[50px] flex items-center">Коммутация пунктлари</div>
                                        <div className="p-2 h-[50px] flex items-center">Ўзаро ишлаш рақами</div>
                                    </div>
                                </div>
                            </td>
                            <td className="border border-black p-2 text-center font-bold">7</td>
                            <td className="border border-black p-1">
                                <MyTextarea control={form.control} name="backupHoTrack" className="border-none focus:ring-0 h-full min-h-[120px]" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 text-center font-bold">8</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="switchingPoints" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 text-center font-bold">9</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="backupInteractionNumber" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>

                        {/* PASTKI QISMLAR */}
                        <tr>
                            <td className="border border-black p-2 font-medium">Айланиб ўтишни ташкил қилиш учун жавобгар раҳбар станция</td>
                            <td className="border border-black p-2 text-center font-bold">10</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="responsibleStation" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 font-medium">Графикни жорий этиш норматив вақти</td>
                            <td className="border border-black p-2 text-center font-bold">11</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="implementationTime" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 font-medium">ААГни жорий этиш тўғрисида фармойиш</td>
                            <td className="border border-black p-2 text-center font-bold">12</td>
                            <td className="border border-black p-1">
                                <MyInput control={form.control} name="aagOrder" className="border-none focus:ring-0 h-8" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 font-medium">Изоҳ</td>
                            <td className="border border-black p-2 text-center font-bold">13</td>
                            <td className="border border-black p-1">
                                <MyTextarea control={form.control} name="comment" className="border-none focus:ring-0 min-h-[60px]" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <FormContainerFooter>
                    <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                        {t("Back")}
                    </Button>
                </FormContainerFooter>
            </form>
        </Form>
    );
};

export default BypassScheduleForm;