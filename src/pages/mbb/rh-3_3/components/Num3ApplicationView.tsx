// import { Form, MyInput } from "dgz-ui-shared/components/form";
// import { useTranslation } from "react-i18next";
// import { useFieldArray, useForm } from "react-hook-form";
// import { Button } from "dgz-ui/button";
// import { Plus, Trash2 } from "lucide-react";

// const F56DocumentForm = () => {
//   const { t } = useTranslation();

// const form = useForm<any>({
//   defaultValues: {
//     requestNumber: "",
//     APInput: "",
//     UBPInput: "",
//     data: [
//       {
//         orderNumberAndDate: "",
//         specifiedDeadline: "",
//         actualCompletion: "",
//         responsibleExecutor: "",
//         customerDetails: "",
//         failureReason: "",
//         comment: "",
//       },
//     ],
//   }
// });

// const { fields, append, remove } = useFieldArray({
//   control: form.control,
//   name: "data",
// });

//   return (
//     <Form {...form}>
//       <form className="p-4">
//         <div className="w-full max-w-7xl mx-auto p-4">
//           <h1 className="text-2xl font-bold text-center mb-4">
//             «ЎзТТБРМ» ДУК фармойишлари бажарилганлиги тўғрисида маълумот шакли
//           </h1>
//           <div className="flex flex-col mb-6">
//             <p className="text-center text-sm">
//               «ЎзТТБРМ» ДУКнинг алоқалари шакллантириш/тугатиш/қайта
//               шакллантириш/блокировкалаш/блокдан чиқариш бўйича фармойишларининг
//               бажарилиши тўғрисида <br />
//             </p>
//             <div className="flex items-center justify-center">
//               <MyInput
//                 control={form.control}
//                 placeholder={t("")}
//                 name={"requestNumber"}
//                 className="border border-t-0 border-l-0 border-r-0 rounded-none w-[100px]"
//               />{" "}
//               сон МАЪЛУМОТ
//             </div>
//           </div>
//         </div>
//         <table className="border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-3 text-xs text-center align-middle w-12"
//               >
//                 Т.р.
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-4 py-3 text-xs text-center"
//               >
//                 «ЎзТТБРМ» ДУК фармойишининг сони ва сана
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-4 py-3 text-xs text-center"
//               >
//                 Фармойишда кўрсатилган бажариш муддати
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-4 py-3 text-xs text-center"
//               >
//                 Фармойиш хатката бажарилганлиги
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-4 py-3 text-xs text-center"
//               >
//                 Фармойишни бажариш учун жавобгарлар
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-4 py-3 text-xs text-center"
//               >
//                 Ижрочи (алоқани қабул қилган ижрочи фамилияси)
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-4 py-3 text-xs text-center"
//               >
//                 Бажарилмаганлик сабаби
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-4 py-3 text-xs text-center w-32"
//               >
//                 Изох*
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {fields.map((field, index) => (
//               <tr key={field.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-2 py-2 text-center font-medium">
//                   {index + 1}
//                 </td>
//                 <td className="border border-gray-300 px-2 py-2">
//                   <MyInput
//                     {...form.register(`data.${index}.orderNumberAndDate`)}
//                     className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
//                     placeholder="Order #12345 - 2025-12-10"
//                   />
//                 </td>
//                 <td className="border border-gray-300 px-2 py-2">
//                   <MyInput
//                     {...form.register(`data.${index}.specifiedDeadline`)}
//                     className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
//                     placeholder="2025-12-20"
//                   />
//                 </td>
//                 <td className="border border-gray-300 px-2 py-2">
//                   <MyInput
//                     {...form.register(`data.${index}.actualCompletion`)}
//                     className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
//                     placeholder="Completed"
//                   />
//                 </td>
//                 <td className="border border-gray-300 px-2 py-2">
//                   <MyInput
//                     {...form.register(`data.${index}.responsibleExecutor`)}
//                     className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
//                     placeholder="John Doe"
//                   />
//                 </td>
//                 <td className="border border-gray-300 px-2 py-2">
//                   <MyInput
//                     {...form.register(`data.${index}.customerDetails`)}
//                     className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
//                     placeholder="Customer ABC"
//                   />
//                 </td>
//                 <td className="border border-gray-300 px-2 py-2">
//                   <MyInput
//                     {...form.register(`data.${index}.failureReason`)}
//                     className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
//                   />
//                 </td>
//                 <td className="border border-gray-300 px-2 py-2">
//                   <MyInput
//                     {...form.register(`data.${index}.comment`)}
//                     className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
//                     placeholder="No issues"
//                   />
//                 </td>
//                 <td className="border border-gray-300 px-2 py-2 text-center">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => remove(index)}
//                     disabled={fields.length === 1}
//                     className="text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
//                   >
//                     <Trash2 size={18} />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="mt-4">
//           <Button
//             type="button"
//             onClick={() =>
//               append({
//                 orderNumberAndDate: '',
//                 specifiedDeadline: '',
//                 actualCompletion: '',
//                 responsibleExecutor: '',
//                 customerDetails: '',
//                 failureReason: '',
//                 comment: '',
//               })
//             }
//             className="flex items-center gap-2"
//           >
//             <Plus size={20} />
//             Yangi qator qo'shish
//           </Button>
//         </div>
//         <div className="mt-4 text-sm">
//           <MyInput
//             placeholder={t("")}
//             {...form.register("APInput")}
//             label="АП номери, бажарувчининг исм-шарифи, фамилияси ва сана"
//             className="w-1/3"
//           />
//           <MyInput
//             {...form.register("UBPInput")}
//             label="УБП номери, бажарувчининг исм-шарифи, фамилияси ва сана"
//             placeholder={t("")}
//             className="w-1/3"
//           />
//         </div>
//         <div className="mt-8 cursor-pointer">
//           <Button type="submit" size="lg">
//             Create
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default F56DocumentForm;
