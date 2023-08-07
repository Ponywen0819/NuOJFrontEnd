"use client"

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { color_context } from '@/contexts/color';
import { auth_context } from '@/contexts/auth';
import { navigate_context } from '@/contexts/navigate';
import { oauth_context } from '@/contexts/oauth';
import { 
    success_swal, 
    error_swal, 
    show_mail_confirm_swal 
} from '@/components/notification';
import { useForm } from 'react-hook-form';
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

import logo_min from '@/public/logo_min.png'
import NextLink from 'next/link';


const Login = ()=>{
    const color = useContext(color_context);
    const auth = useContext(auth_context);
    const navigate = useContext(navigate_context); 
    const { github_oauth_url, google_oauth_url } = useContext(oauth_context);
    const router = useRouter();
    const {
        register,
        handleSubmit
    } = useForm();

    const handleLogin = async (info) => {
        let StateCode = await auth.signin(info);
        if(StateCode === 200) {
            success_swal("登入成功").then(()=>{
                const url = navigate.get() || "/";
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
                onSubmit={handleSubmit(handleLogin)}
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
                    <Input type='account' placeholder='請輸入 Handle' {...register("account")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>密碼</FormLabel>
                    <Input type='password' placeholder='請輸入密碼' {...register("password")}/>
                </FormControl>
                <Button
                    type='submit'
                    backgroundColor={`${color}.300`}
                    _hover={{
                        backgroundColor : `${color}.500`,
                        color: `white`
                    }}
                >登入</Button>
                <Box position={'relative'} marginY={3}>
                    <Divider/>
                    <AbsoluteCenter>或</AbsoluteCenter>
                </Box>
                { github_oauth_url ? <Button>使用 github 登入</Button> : ''}
                { google_oauth_url ? <Button>使用 google 登入</Button> : ''}
                <Text align={'center'}>
                    尚未擁有帳號？
                    <Link as={NextLink} href='/auth/registe' color={`${color}.400`}> 註冊 </Link>
                </Text>
            </Stack>
        </Box>
    )
}

export default Login;