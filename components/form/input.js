import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@/components/chakra";
import { useFormContext } from "react-hook-form";
import { createElement } from "react";

export const InputGroup = ({
  id,
  type,
  lable,
  placeholder,
  onChange,
  defaultValue = "",
  input = Input,
  required = false,
  ...prop
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl isInvalid={errors[id]}>
      <FormLabel>{lable}</FormLabel>
      {createElement(input, {
        type,
        placeholder,
        defaultValue,
        ...prop,
        ...register(id, { required }),
      })}
      {errors[id]?.message && (
        <FormErrorMessage marginTop={1} paddingX={1}>
          {errors[id] && errors[id].message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
