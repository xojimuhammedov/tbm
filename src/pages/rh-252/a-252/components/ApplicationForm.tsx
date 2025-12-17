import { Form } from "dgz-ui-shared/components/form";
import { useForm } from "react-hook-form";

const ApplicationDocumentForm = () => {
  const form = useForm();
  return <Form {...form}>Hello</Form>;
};

export default ApplicationDocumentForm;
