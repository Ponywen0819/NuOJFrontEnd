"use client"

import { useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth_context } from '@/contexts/auth';
import { success_swal, error_swal } from '@/components/notification';
import { 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuList, 
    IconButton,
    Stack
} from '@chakra-ui/react';
import { NavLink } from '@/components/navbar/link';
import NextLink from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';

const UserMenu = () => {
    return(
        <Menu>
            <MenuButton 
                as={IconButton}
                icon={<HamburgerIcon/>}
                rounded={true}
                variant="outline"
                aria-label="Options"
                colorScheme='whiteAlpha'
            />
            <MenuList>
                
            </MenuList>
        </Menu>
    )
}


export const User = () =>{
    const path = usePathname();
    const auth = useContext(auth_context);
    const router = useRouter();
    const user = auth.getUser();

    const handleLogout = async () =>{
        let state_code = await auth.signout();
        if(state_code !== 200) {
            error_swal("發生錯誤","發生預期外的錯誤導致無法登出！");
        }
        else{
            success_swal("已登出").then(()=>{
                if(path !== "/") router.push("/");
            })
        }
    }

    const isLogin = (user && user.isLogin);
    const notLogin = ( user && !user.isLogin);
    console.log(user ,isLogin, notLogin)

    const element_class = "text-white text-xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100 ml-10"
    return(
        <Stack width={'fit-content'} marginLeft={'auto'} direction={'row'} gap={10} align={'center'}>
            {
                isLogin && (
                    <UserMenu/>
                )
            }
            <UserMenu/>
            {
                notLogin && (
                    <>
                        <NavLink href={'/auth/login'}>登入</NavLink>
                        <NavLink href={'/auth/registe'}>註冊</NavLink>
                    </>
                )
            }
        </Stack>
    )
}