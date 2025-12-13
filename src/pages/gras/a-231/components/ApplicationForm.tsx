import { Form, MyInput } from "dgz-ui-shared/components/form";
import useApplicationDocumentForm from "@/pages/rtsi/application/hooks/useApplicationDocumentForm.ts";

interface ApplicationDocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const ApplicationDocumentForm = ({
  id,
  onSave,
}: ApplicationDocumentFormProps) => {
  const { form, handleSubmit } = useApplicationDocumentForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="py-6 px-4">
        <div className="w-full max-w-6xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            Айланиб ўтиш ва алмаштиришлар графиги
          </h1>
          <div className="text-right mb-2 text-sm">3.2-шакл</div>

          <div className="border border-gray-800">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td
                    colSpan={2}
                    className="border-r border-gray-800 p-2 text-sm"
                  >
                    График номери
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    1
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="graphNumber"
                    />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="border-t border-gray-800">
                  <td
                    colSpan={2}
                    className="border-r border-gray-800 p-2 text-sm"
                  >
                    Ушбу айланиб ўтишдан фойдаланиладиган графиклар
                    пунктларининг рўйҳати
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    2
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="pointsList"
                    />
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="border-t border-gray-800">
                  <td
                    colSpan={2}
                    className="border-r border-gray-800 p-2 text-sm"
                  >
                    Тикланадиган НО учун қўлланадиган автоматик резервлаш
                    принципи
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    3
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="reservePrinciple"
                    />
                  </td>
                </tr>

                {/* Row 4 - Асосий трасса (rowspan=3) */}
                <tr className="border-t border-gray-800">
                  <td
                    rowSpan={3}
                    className="border-r border-gray-800 p-2 align-middle text-center font-medium w-32"
                  >
                    Асосий трасса
                  </td>
                  <td className="border-r border-gray-800 p-2 text-sm">
                    Фойдаланилган НО тури, алока номери
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    4
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="mainRouteType"
                    />
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="border-t border-gray-800">
                  <td className="border-r border-gray-800 p-2 text-sm">
                    Тракт (канал)нинг НО трассаси
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    5
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="mainRouteTrack"
                    />
                  </td>
                </tr>

                {/* Row 6 */}
                <tr className="border-t border-gray-800">
                  <td className="border-r border-gray-800 p-2 text-sm">
                    Узаро ишлаш рақами
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    6
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="mainRouteInteraction"
                    />
                  </td>
                </tr>

                {/* Row 7 - Айланиб ўтадиган трасса (rowspan=3) */}
                <tr className="border-t border-gray-800">
                  <td
                    rowSpan={3}
                    className="border-r border-gray-800 p-2 align-middle text-center font-medium w-32"
                  >
                    Айланиб ўтадиган трасса
                  </td>
                  <td className="border-r border-gray-800 p-2 text-sm">
                    Тракт (канал)нинг НО трассаси
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    7
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="bypassRouteTrack"
                    />
                  </td>
                </tr>

                {/* Row 8 */}
                <tr className="border-t border-gray-800">
                  <td className="border-r border-gray-800 p-2 text-sm">
                    Коммутация пунктлари
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    8
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="bypassRouteCommutation"
                    />
                  </td>
                </tr>

                {/* Row 9 */}
                <tr className="border-t border-gray-800">
                  <td className="border-r border-gray-800 p-2 text-sm">
                    Узаро ишлаш рақами
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    9
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="bypassRouteInteraction"
                    />
                  </td>
                </tr>

                {/* Row 10 */}
                <tr className="border-t border-gray-800">
                  <td
                    colSpan={2}
                    className="border-r border-gray-800 p-2 text-sm"
                  >
                    Айланиб ўтишни ташкил қилиш учун жавобгар раҳбар станция
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    10
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="responsibleStation"
                    />
                  </td>
                </tr>

                {/* Row 11 */}
                <tr className="border-t border-gray-800">
                  <td
                    colSpan={2}
                    className="border-r border-gray-800 p-2 text-sm"
                  >
                    Графикни жорий этиш норматив вақти
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    11
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="implementationTime"
                    />
                  </td>
                </tr>

                {/* Row 12 */}
                <tr className="border-t border-gray-800">
                  <td
                    colSpan={2}
                    className="border-r border-gray-800 p-2 text-sm"
                  >
                    ААГни жорий этиш тўғрисида фармойиш
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    12
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="implementationOrder"
                    />
                  </td>
                </tr>

                {/* Row 13 */}
                <tr className="border-t border-gray-800">
                  <td
                    colSpan={2}
                    className="border-r border-gray-800 p-2 text-sm"
                  >
                    Изоҳ
                  </td>
                  <td className="border-r border-gray-800 p-2 text-center w-12 text-sm">
                    13
                  </td>
                  <td className="p-2">
                    <MyInput
                      control={form.control}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
                      // name="note"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ApplicationDocumentForm;
