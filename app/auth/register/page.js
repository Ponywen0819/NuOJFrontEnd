"use client";

import { useRouter } from "next/navigation";
import { error_swal } from "@/components/notification";
import { color_context } from "@/contexts/color";
import { useContext } from "react";
import { Button, Stack } from "@/components/chakra";
import Swal from "sweetalert2";
import { Header } from "../components/header";
import { AuthDivider } from "../components/divider";
import { Oauth } from "../components/oauth";
import { Footer } from "../components/footer";
import { useFormContext, useForm, FormProvider } from "react-hook-form";
import { Form, InputGroup } from "@/components/form";

const RegisterBtn = () => {
  const color = useContext(color_context);
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Button type="submit" colorScheme={color} isLoading={isSubmitting}>
      註冊
    </Button>
  );
};

const Register = () => {
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit, setError } = methods;

  const validate = (data) => {
    const { password, password_check } = data;

    if (password !== password_check) {
      setError("password_check");
      setError("password");
      error_swal("註冊失敗", "密碼不一致");
      return false;
    }
    return true;
  };

  const handleRegister = async (data) => {
    const { handle, email, password } = data;

    if (!validate(data)) return;

    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ handle, email, password }),
    });

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "註冊成功",
        text: "驗證信已寄至信箱，請收信來驗證信箱",
        showConfirmButton: true,
      }).then(() => {
        router.push("/");
      });
      return;
    }

    const resCode = res.status;
    if (resCode === 422) {
      setError("handle");
      setError("email");
      setError("password");
      setError("password_check");
      error_swal("註冊失敗", "帳號、電子郵件或密碼不合法");
      return;
    }
    if (resCode === 403) {
      setError("email");
      setError("handle");
      error_swal("註冊失敗", "帳號或電子信箱重複");
      return;
    }

    error_swal("註冊失敗", "發生未知錯誤");
  };

  return (
    <FormProvider {...methods}>
      <Header label={"註冊"} />
      <Stack
        as={"form"}
        onSubmit={handleSubmit(handleRegister)}
        gap={3}
        noValidate={true}
      >
        <InputGroup
          id="handle"
          lable={"帳號"}
          type="handle"
          placeholder="請輸入 Handle"
          required={true}
        />
        <InputGroup
          id="email"
          lable={"電子信箱"}
          type="email"
          placeholder="請輸入電子信箱"
          required={true}
        />
        <InputGroup
          id="password"
          lable={"密碼"}
          type="password"
          placeholder="請輸入密碼"
          required={true}
        />
        <InputGroup
          id="password_check"
          lable={"密碼確認"}
          type="password"
          placeholder="請再次輸入密碼"
          required={true}
        />
        <RegisterBtn />
      </Stack>
      <AuthDivider />
      <Oauth />
      <Footer label={"登入"} href={"/auth/login"} />
    </FormProvider>
  );
};

export default Register;
