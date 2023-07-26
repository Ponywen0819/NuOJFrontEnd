'use client'

import { usePathname, useRouter } from 'next/navigation';

import { auth_context } from '@/contexts/auth';
import { success_swal, error_swal } from '@/components/notification';
import { useContext, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuList, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo-white.svg';

const User = () =>{
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


    const element_class = "text-white text-2xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100"
    return(
        <div className="flex gap-20 items-center justify-end w-fit">
            {(user.state === 1)?(
                <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='User menu'
                      colorScheme='whiteAlpha'
                      size={'lg'}
                      icon={<HamburgerIcon />}
                      variant='outline'
                      borderWidth={'3px'}
                    />
                    <MenuList>
                        <MenuItem 
                            onClick={()=>router.push(`/profile/${user?.handle}`)}

                        >個人檔案</MenuItem>
                        <MenuItem onClick={handleLogout}>登出</MenuItem>
                    </MenuList>
                </Menu>):
                (
                    <>
                        <Link className={element_class} href="/auth/login"> 登入 </Link>
                        <Link className={element_class} href="/auth/registe"> 註冊 </Link>
                    </>
                )}
        </div>
    )
}

export const Navbar = ()=>{
    const path = usePathname();
    const NavColor = (path === "/")? '' : "bg-black"
    const NavClass = `absolute p-10 w-full flex justify-between h-32 z-10 top-0 ` + NavColor;
    const LinkClass = "text-white text-2xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100 ml-10"
    return(
        <nav className={NavClass}>
            <div className={'flex items-center'}>
                <div>
                    <Link href={"/"} className='h-full'>
                        <Image src={logo} width={128}></Image>
                    </Link>
                </div>
                {
                    (path.match(/\/problem\/?.*/))?(
                        <>
                            <Link className={LinkClass} href={"/problem/list"}>題目列表</Link>
                            <Link className={LinkClass} href={"/problem/submition"}>提交狀況</Link>
                        </>
                    ):(
                        <>
                            <Link className={LinkClass} href={"/problem"}>題目</Link>
                            <Link className={LinkClass} href={"/about"}>關於</Link>
                            <Link className={LinkClass} href={"/status"}>狀態</Link>
                        </>
                    )
                }
            </div>
            <User></User>
        </nav>
    )
}
