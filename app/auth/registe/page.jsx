"use client"

import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { HOST } from '@/setting';
import { error_swal } from "@/components/notification";
import { color_context } from '@/contexts/color';
import { oauth_context } from '@/contexts/oauth';
import { useContext } from "react";
import {
    Box,
    Text,
    AbsoluteCenter,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Divider,
    Button,
    Image,
    Link
} from '@/components/chakra';
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";

import logo_min from '@/public/logo_min.png'

const Registe = () =>{
    const color = useContext(color_context);    
    const { github_oauth_url, google_oauth_url } = useContext(oauth_context);
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    
    const handleRegister = async (data) => {
        const { handle, email, password } = data;
        let res = await fetch(`${HOST}/api/auth/register`, {
            "method": "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({ handle, email, password })
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
            else{
                error_swal("註冊失敗", "發生未知錯誤")
            }
        }
    }

    return(
        <Box
            backgroundColor={`${color}.300`}
            position={'fixed'}
            inset={0}
            paddingX={3}
            paddingY={5}
            overflowY={'auto'}
        >
            <Stack 
                as={'form'}
                onSubmit={handleSubmit(handleRegister)}
                position={'relative'}
                width={'sm'}
                boxShadow={'sm'}
                boxSizing='border-box'
                marginX={'auto'}
                borderRadius={'lg'}
                backgroundColor={"white"}
                paddingX={3}
                paddingY={5}
            >   
                <Link as={NextLink} href='/'>
                    <Image 
                        alt='Logo' 
                        src={logo_min.src} 
                        boxSize={16}
                        marginX={'auto'}
                    />
                </Link>
                <FormControl>
                    <FormLabel>帳號</FormLabel>
                    <Input type='account' placeholder='請輸入 Handle' {...register("handle")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>電子信箱</FormLabel>
                    <Input type='email' placeholder='請輸入電子信箱' {...register("email")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>密碼</FormLabel>
                    <Input type='password' placeholder='請輸入密碼' {...register("password")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>密碼確認</FormLabel>
                    <Input type='password' placeholder='請再次輸入密碼' {...register("passwordCheck")}/>
                </FormControl>
                <Button
                    type='submit'
                    backgroundColor={`${color}.300`}
                    _hover={{
                        backgroundColor : `${color}.500`,
                        color: `white`
                    }}
                >註冊</Button>
                <Box position={'relative'} marginY={3}>
                    <Divider/>
                    <AbsoluteCenter>或</AbsoluteCenter>
                </Box>
                { github_oauth_url ? <Button>使用 github 註冊</Button> : ''}
                { google_oauth_url ? <Button>使用 google 註冊</Button> : ''}
                <Text align={'center'}>
                    已擁有帳號？
                    <Link as={NextLink} href='/auth/login' color={`${color}.400`}> 登入 </Link>
                </Text>
            </Stack>
        </Box>
    )
}

export default Registe;