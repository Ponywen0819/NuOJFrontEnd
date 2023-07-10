"use client"

import { useRouter } from 'next/navigation';
import { Form } from '@/components/form';
import { useContext, useEffect } from 'react';
import { color_context } from '@/contexts/color';
import { auth_context } from '@/contexts/auth';
import { navigate_context } from '@/contexts/navigate';
import {success_swal, error_swal, show_mail_confirm_swal } from '@/components/notification';

const Login = ()=>{
    const color = useContext(color_context);
    const auth = useContext(auth_context);
    const from = useContext(navigate_context); 
    const router = useRouter();

    const handleLogin = async (info) => {
        let StateCode = await auth.signin(info);
        if(StateCode === 200) {
            success_swal("登入成功").then(()=>{
                const url = from.get() || "/";
                router.push(url);
            });
        }
        else{
            if ( StateCode === 403) {
                error_swal("登入失敗", "帳號或密碼錯誤");
            }
            else if (StateCode == 422) {
                error_swal("登入失敗", "錯誤的信箱格式")
            }
            else if (StateCode === 401 ){
                show_mail_confirm_swal(info.account)
            }
            else{
                error_swal("登入失敗", "未知的錯誤");
            }
        }
    }

    return(
        // ["bg-blue-300", "bg-orange-300", "bg-purple-300", "bg-red-300"];
        <div className={`min-h-screen bg-${color}-300 flex `}>
            <Form
                title={"登入"}
                inputs={[
                    {
                        key: "account",
                        type: "text",
                        placeholder: "帳號或電子信箱"
                    },
                    {
                        key: "password",
                        type: "password",
                        placeholder: "密碼"
                    }
                ]}
                color={color}
                feet={[
                    {url: "/auth/registe", content: "沒有帳號嗎？點此註冊"}
                ]}
                callback={handleLogin}
            />
        </div>
    )
}

export default Login;