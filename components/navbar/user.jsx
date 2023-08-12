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
    Flex
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
            <MenuItem as={MenuLink} href={`/admin/problem/list`}>
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


export const User = () =>{
    const { user }= useContext(auth_context);

    const isLogin = (user && user.isLogin);
    const notLogin = ( user && !user.isLogin);
    return(
        <Flex width={'fit-content'} marginLeft={'auto'} gap={10} align={'center'}>
            <Flex display={{base: 'none', lg: 'flex'}} gap={10}>
                { notLogin && <NavLink href={'/auth/login'}>登入</NavLink>}
                { notLogin && <NavLink href={'/auth/registe'}>註冊</NavLink>}
                { isLogin &&(
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
                )}
            </Flex>
            <Flex display={{base: 'flex', lg: 'none'}}>
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
                        <MenuItem as={MenuLink} href={'/problem/list'}>
                            題目
                        </MenuItem>
                        <MenuItem as={MenuLink} href={`/about`}>
                            關於
                        </MenuItem>
                        <MenuDivider/>
                        { isLogin && (
                            <>
                                <UserOption/>
                            </>
                        )}
                        { notLogin && (
                            <>
                                <MenuItem as={MenuLink} href={'/auth/login'}>
                                    登入
                                </MenuItem>
                                <MenuItem as={MenuLink} href={`/auth/registe`}>
                                    註冊
                                </MenuItem>
                            </>
                        )}
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}