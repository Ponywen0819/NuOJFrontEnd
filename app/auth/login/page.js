"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { color_context } from "@/contexts/color";
import { auth_context } from "@/contexts/auth";
import { navigate_context } from "@/contexts/navigate";
import {
  success_swal,
  error_swal,
  show_mail_confirm_swal,
} from "@/components/notification";
import {
  Box,
  AbsoluteCenter,
  Divider,
  Button,
  Stack,
} from "@/components/chakra";
import { InputGroup } from "@/components/form";
import { Header } from "@/components/authHeader";
import { Oauth } from "@/components/authOauth";
import { Footer } from "@/components/authFooter";
import { useFormContext, useForm, FormProvider } from "react-hook-form";

const LoginBtn = () => {
  const color = useContext(color_context);
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Button type="submit" colorScheme={color} isLoading={isSubmitting}>
      登入
    </Button>
  );
};

const Login = () => {
  const auth = useContext(auth_context);
  const methods = useForm();
  const { handleSubmit, setError } = methods;

  const errors = {
    401: () => {
      show_mail_confirm_swal("undefined");
    },
    403: () => {
      setError("account", { message: "incorrect" });
      setError("password", { message: "incorrect" });
    },
  };

  const handleLogin = (data) =>
    auth.signin({
      ...data,
      errors,
    });

  return (
    <FormProvider {...methods}>
      <Header lable={"登入"} />
      <Stack
        as={"form"}
        onSubmit={handleSubmit(handleLogin)}
        gap={3}
        noValidate={true}
      >
        <InputGroup
          id={"account"}
          type={"account"}
          lable={"帳號"}
          placeholder={"請輸入 Handle 或是電子信箱"}
          required={true}
        />
        <InputGroup
          id={"password"}
          type="password"
          lable={"密碼"}
          placeholder={"請輸入密碼"}
          required={true}
        />
        <LoginBtn />
      </Stack>
      <Box position={"relative"}>
        <Divider />
        <AbsoluteCenter>或</AbsoluteCenter>
      </Box>
      <Oauth />
      <Footer lable={"註冊"} href={"/auth/register"} />
    </FormProvider>
  );
};

export default Login;
