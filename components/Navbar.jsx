'use client'

import { usePathname, useRouter } from 'next/navigation';
import { auth_context } from '@/contexts/auth';
import { success_swal, error_swal } from '@/components/notification';
import { useContext, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo-white.svg';

const UserDropDown = ({handle}) =>{
    const path = usePathname;
    const router = useRouter();
    let profile_url = "/profile/" + handle;
    let auth = useContext(auth_context);

    const handleLogout = async () =>{
        let state_code = await auth.signout();
        if(state_code !== 200) {
            error_swal("發生錯誤","發生預期外的錯誤導致無法登出！");
        }
        else{
            success_swal("已登出").then(()=>{
                if(path !== "/"){
                    router.push("/");
                }
            })
        }
    }

    const drops = [
        {title: "個人檔案", to: profile_url},
        // {title: "設定", to: "/setting"},
    ]

    let element_class = "text-black border-b-2 border-white border-opacity-0 duration-500 hover:border-black hover:border-opacity-100 text-left"
    return(
        <div className="absolute w-32 right-px top-0 pt-10">
            <div className='flex flex-col shadow-3xl w-full rounded-sm p-2 bg-white gap-2 border-2 duration-500'>
                {
                    drops.map((drop)=>(
                        <Link className={element_class} href={drop.to} key={drop.title}>{drop.title}</Link>
                    ))
                }
                <button onClick={handleLogout} className={element_class}>登出</button>
            </div>  
        </div>
    )
}

const User = () =>{
    const [drop, setDrop] = useState(false);
    const auth = useContext(auth_context);
    let user = auth.getUser();

    let element_class = "text-white text-2xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100"
    return(
        <div className="flex gap-20 items-center justify-end w-fit">
            {
                (user.state === 1)?(
                    <div onMouseEnter={()=>setDrop(true)} onMouseLeave={()=>setDrop(false)} className="relative">
                    <p className={element_class} > { user.handle } </p>
                    {
                        drop && <UserDropDown handle={ user.handle }></UserDropDown>
                    }
                </div>
                ):(
                    <>
                        <Link className={element_class} href="/auth/login"> 登入 </Link>
                        <Link className={element_class} href="/auth/registe"> 註冊 </Link>
                    </>
                )
            }
        </div>
    )
}

export const Navbar = ()=>{
    const path = usePathname();
    const NavColor = (path === "/")? '' : "bg-black"
    const NavClass = `absolute p-10 w-full flex justify-between h-32 z-10 top-0 ` + NavColor;
    const LinkClass = "text-white text-2xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100 ml-10"
    const auth = useContext(auth_context);
    const links = (path.match(/\/problem\/?.*/))?[
        {title: "題目列表", href: "/problem/list"},
        {title: "提交狀況", href: "/problem/submition"},
    ]:
    
    [
        { title: "題目", href: "/problem" },
        { title: "關於", href: "/about" },
        { title: "狀態", href: "/status" },
    ]


    return(
        <nav className={NavClass}>
            <div className={'flex items-center'}>
                <div>
                    <Link href={"/"} className='h-full'>
                        <Image src={logo} width={128}></Image>
                    </Link>
                </div>
                {
                    links.map((link)=>(
                        <Link
                            className={LinkClass}
                            href={link.href}
                            key={link.title}
                        >{link.title}</Link>
                    ))
                }
            </div>
            <User></User>
        </nav>
    )
}
