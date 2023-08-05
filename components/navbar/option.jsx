'use client';

import { 
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    IconButton,
    HamburgerIcon
} from '@/components/chakra';
import { MenuLink } from '@/components/navbar/link';
import { UserOption } from './user';
import { useContext } from 'react';
import { auth_context } from '@/contexts/auth';

export const Options = () =>{
    const { user } = useContext(auth_context);

    return(
        <Menu>
            <MenuButton 
                as={IconButton} 
                icon={<HamburgerIcon/>}
                variant={'outline'}
                colorScheme='whiteAlpha'
            />
            <MenuList>
                <MenuItem as={MenuLink} href={`/problem/list`}>
                    問題
                </MenuItem>
                <MenuItem as={MenuLink} href={`/about`}>
                    關於
                </MenuItem>
                {
                    (user?.isLogin) && (
                    <>
                        <MenuDivider/>
                        <UserOption/>
                    </>)
                }
                {
                    (user && !user?.isLogin) && (
                    <>
                        <MenuDivider/>
                        <MenuItem as={MenuLink} href={`/auth/login`}>
                            登入
                        </MenuItem>
                        <MenuItem as={MenuLink} href={`/auth/registe`}>
                            註冊
                        </MenuItem>
                    </>)
                }
            </MenuList>
        </Menu>
    )
}