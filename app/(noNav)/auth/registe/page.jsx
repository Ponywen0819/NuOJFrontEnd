"use client"

import { useRouter } from 'next/navigation';
import { HOST } from '@/setting';
import { success_swal, error_swal } from "@/components/notification";
import { Form } from "@/components/form"
import { color_context } from '@/contexts/color';
import { useContext } from "react";
import Swal from "sweetalert2";


const Registe = () =>{
    const color = useContext(color_context);    
    const router = useRouter();

    const handleRegister = async (info) => {
        let res = await fetch(`${HOST}/api/auth/register`, {
            "method": "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(info)
        });

        if(res.ok){
            Swal.fire({
                icon: "success",
                title: "註冊成功",
                text: "驗證信已寄至信箱，請收信來驗證信箱",
                showConfirmButton: true
            }).then(() => {router.push("/")});
        }
        else{
            let resCode = res.status;
            if(resCode === 422){
                error_swal("註冊失敗", "錯誤的信箱、密碼或 handle 格式。");
            }
            if(resCode === 403){
                error_swal("註冊失敗", "信箱或 handle 重複。")
            }
        }
    }

    return(
        <div className={`min-h-screen bg-${color}-300 flex `}>
            <Form
                title={"註冊"}
                inputs={[
                 {
                    key: "handle",
                    type: "text",
                    placeholder: "使用者名稱"
                 },
                 {
                    key: "email",
                    type: "text",
                    placeholder: "信箱"
                 },
                 {
                    key: "password",
                    type: "password",
                    placeholder: "密碼"
                 }
                ]}
                color={color}
                feet={[
                    {url: "/auth/login", content: "已經有帳號了嗎？點此登入"}
                ]}
                callback={handleRegister}
            />
        </div>
    )
}

export default Registe;