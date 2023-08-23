import { useForm, FormProvider } from "react-hook-form";
import { Stack } from "@/components/chakra";

export { InputGroup } from "./input";

export const Form = ({ onSubmit, children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Stack as={"form"} gap={3} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </Stack>
    </FormProvider>
  );
};
