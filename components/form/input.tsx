import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ChakraComponent,
} from "@/components/chakra";
import { useFormContext } from "react-hook-form";
import { createElement } from "react";

export type InputGroupProp = {
  id: string;
  label: string;
  placeholder: string;
  input?: any;
  type?: "text";
  defaultValue?: string | number;
  required?: string | boolean;
  onChange?: (e: Event) => void;
  [x: string]: any;
};

export const InputGroup = ({
  id,
  label,
  placeholder,
  type = "text",
  onChange = () => {},
  defaultValue = "",
  input = Input,
  required = false,
  ...prop
}: InputGroupProp) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors[id] ? true : false}>
      <FormLabel>{label}</FormLabel>
      {createElement(input, {
        type,
        placeholder,
        defaultValue,
        onChange: onChange,
        ...prop,
        ...register(id, { required }),
      })}
      {errors[id]?.message && (
        <FormErrorMessage marginTop={1} paddingX={1}>
          {errors[id] && (errors[id].message as string)}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
