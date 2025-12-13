import { Form, MyInput } from "dgz-ui-shared/components/form";
import useF54DocumentForm from "@/pages/rtsi/f-54/hooks/useF54DocumentForm.ts";
import { ApplicationDto } from "../../a-231/schemas/createApplicationSchema";

interface F54DocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const F56DocumentForm = ({ id, onSave }: F54DocumentFormProps) => {
  const { form, handleSubmit } = useF54DocumentForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4">
        <div className="w-full max-w-7xl mx-auto p-4">
          <h1 className="text-lg font-bold text-center mb-4">
            РРРЛда трактлар учун айланиб ўтишлар ва алмаштиришлар графикларининг
            рўйхати
          </h1>
          <div className="text-right mb-2 text-sm">3.2 «b»-шакл</div>
          <div className="border border-gray-800 overflow-x-auto">
            <table className="w-full border-collapse min-w-max">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-800 p-2 text-sm font-medium w-16">
                    т/р.
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-40">
                    Каналларнинг номлари
                  </th>
                  <th
                    colSpan={8}
                    className="border border-gray-800 p-2 text-sm font-medium"
                  >
                    ААГ номи (номери)
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  <th colSpan={2} className="border border-gray-800"></th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-24">
                    100050
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-24">
                    100975
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-24">
                    100976
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-24">
                    100977
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-24">
                    100978
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-24">
                    100979
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-24">
                    100980...
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-24">
                    100999
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-800 p-2 text-center text-sm">
                    1.
                  </td>
                  <td className="border border-gray-800 p-2">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
                    />
                  </td>
                  <td className="border border-gray-800 p-1">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
                    />
                  </td>
                  <td className="border border-gray-800 p-1">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
                    />
                  </td>
                  <td className="border border-gray-800 p-1">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
                    />
                  </td>
                  <td className="border border-gray-800 p-1">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
                    />
                  </td>
                  <td className="border border-gray-800 p-1">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
                    />
                  </td>
                  <td className="border border-gray-800 p-1">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
                    />
                  </td>
                  <td className="border border-gray-800 p-1">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
                    />
                  </td>
                  <td className="border border-gray-800 p-1">
                    <MyInput<ApplicationDto>
                      className={
                        "border border-t-0 border-l-0 border-r-0 rounded-none"
                      }
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

export default F56DocumentForm;
