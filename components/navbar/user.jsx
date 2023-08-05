"use client"

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { auth_context } from '@/contexts/auth';
import { success_swal, error_swal } from '@/components/notification';
import { 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuList, 
    MenuDivider,
    IconButton,
    Stack,
} from '@chakra-ui/react';
import { NavLink, MenuLink } from '@/components/navbar/link';
import { HamburgerIcon } from '@chakra-ui/icons';

export const UserOption = () => {
    const { user, signout }= useContext(auth_context);
    const { handle } = user;
    const router = useRouter()

    const handleSighout = async () =>{
        const state = await signout();
        if(state !== 200){
            error_swal("出現未知問題");
            return;
        }

        success_swal("已登出").then(()=>router.push('/'))
    }
    return(
        <>
            <MenuItem as={MenuLink} href={`/profile/${handle}`}>
                個人檔案
            </MenuItem>
            <MenuItem as={MenuLink} href={`/profile/${handle}`}>
                管理員頁面
            </MenuItem>
            <MenuDivider/>
            <MenuItem
                _hover={{
                    'bg': 'gray.100',
                }}
                onClick={handleSighout}
            >
                登出
            </MenuItem>
        </>
    )

} 

const UserMenu = () => {
    return(
        <Menu isLazy>
            <MenuButton 
                as={IconButton}
                icon={<HamburgerIcon/>}
                rounded={'lg'}
                variant="outline"
                aria-label="Options"
                colorScheme='whiteAlpha'
            />
            <MenuList>
                <UserOption/>
            </MenuList>
        </Menu>
    )
}


export const User = () =>{
    const { user }= useContext(auth_context);

    const isLogin = (user && user.isLogin);
    const notLogin = ( user && !user.isLogin);
    const element_class = "text-white text-xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100 ml-10"
    return(
        <Stack width={'fit-content'} marginLeft={'auto'} direction={'row'} gap={10} align={'center'}>
            {
                isLogin && <UserMenu/>
            }
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