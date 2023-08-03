"use client"

import { useContext, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { auth_context } from '@/contexts/auth';
import { success_swal, error_swal } from '@/components/notification';
import { Menu, MenuButton, MenuItem, MenuList, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export const User = () =>{
    const path = usePathname();
    const { user, signout } = useContext(auth_context);
    const router = useRouter();

    const handleLogout = async () =>{
        const state_code = await signout();
        if(state_code !== 200) {
            error_swal("發生錯誤","發生預期外的錯誤導致無法登出！");
        }
        else{
            success_swal("已登出").then(()=>{
                if(path !== "/") router.push("/");
            })
        }
    }


    const element_class = "text-white text-xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100 ml-10"
    return(
        <div className="flex items-center justify-end w-fit">
            {(user && user.isLogin)?(
                <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='User menu'
                      colorScheme='whiteAlpha'
                      icon={<HamburgerIcon />}
                      variant='outline'
                      borderWidth={'1px'}
                    />
                    <MenuList>
                        <MenuItem 
                            onClick={()=>router.push(`/profile/${user?.handle}`)}

                        >個人檔案</MenuItem>
                        <MenuItem onClick={handleLogout}>登出</MenuItem>
                    </MenuList>
                </Menu>):(
                <>
                    <Link className={element_class} href="/auth/login"> 登入 </Link>
                    <Link className={element_class} href="/auth/registe"> 註冊 </Link>
                </>)}
        </div>
    )
}