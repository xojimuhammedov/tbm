import useF56DocumentForm from "@/pages/rtsi/f-56/hooks/useF56DocumentForm.ts";
import { Form, MyInput } from "dgz-ui-shared/components/form";
import useF51List from "@/pages/rtsi/f-51/hooks/useF51List.ts";
import { ApplicationDto } from "@/pages/rtsi/application/schemas/createApplicationSchema.ts";

interface F56DocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const F56DocumentForm = ({ id, onSave }: F56DocumentFormProps) => {
  const { f51List } = useF51List();
  const { form, handleSubmit } = useF56DocumentForm({
    id,
    onSave,
    allF51Ids: (f51List || []).map((d) => d._id),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4">
        <div className="w-full max-w-7xl mx-auto p-4">
          <h1 className="text-lg font-bold text-center mb-4">
            Транспорт тармоғида ишга туширилган айланиб ўтишлар ва алмаштиришлар
            графикларининг рўйхати
          </h1>
          <div className="text-right mb-2 text-sm">3.2 «c»-шакл</div>
          <div className="border border-gray-800 overflow-x-auto">
            <table className="w-full border-collapse min-w-max">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-800 p-2 text-sm font-medium w-16">
                    т/р
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-48">
                    Узатиш линиясининг номи
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-40">
                    Узатиш линияси участкаси
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-32">
                    ААГ номери
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-32">
                    Ўзаро ишлаш номери
                  </th>
                  <th className="border border-gray-800 p-2 text-sm font-medium w-40">
                    Эслатма
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
