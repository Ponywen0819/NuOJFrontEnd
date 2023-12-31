"use client";

import { useContext } from "react";
import { color_context } from "@/contexts/color";
import { auth_context } from "@/contexts/auth";
import {
  success_swal,
  error_swal,
  show_mail_confirm_swal,
} from "@/components/notification";
import { Button, Stack } from "@/components/chakra";
import { InputGroup } from "@/components/form";
import { useRouter } from "next/navigation";
import { AuthDivider } from "../components/divider";
import { Header } from "../components/header";
import { Oauth } from "../components/oauth";
import { Footer } from "../components/footer";
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
  const { login } = useContext(auth_context);
  const methods = useForm();
  const { handleSubmit, setError } = methods;
  const router = useRouter();

  const resultHandler = (code: Number) => {
    switch (code) {
      case 200:
        success_swal("登入成功");
        router.push("/");
        break;
      case 400:
        error_swal("發生未知的錯誤");
        break;
      case 401:
        show_mail_confirm_swal("undefined");
        break;
      case 403:
        setError("account", {});
        setError("password", {});
        error_swal("帳號或密碼錯誤");
        break;
    }
  };

  const handleLogin = (data) => {
    login(data.account, data.password, resultHandler);
  };

  return (
    <FormProvider {...methods}>
      <Header label={"登入"} />
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
      <AuthDivider />
      <Oauth />
      <Footer label={"註冊"} href={"/auth/register"} />
    </FormProvider>
  );
};

export default Login;
