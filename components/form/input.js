import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@/components/chakra";
import { useFormContext } from "react-hook-form";

export const InputGroup = ({
  id,
  type,
  lable,
  placeholder,
  onChange,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl isInvalid={errors[id]}>
      <FormLabel>{lable}</FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        spellCheck={false}
        {...register(id, { required })}
      />
      <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
    </FormControl>
  );
};
