import { User } from '@/components/navbar_user';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo-white.svg';

export const Navbar = ({ links })=>{
    const nav_class = `flex justify-between h-16 max-w-screen-2xl mx-auto`
    const link_class = "text-white text-xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100 ml-10"
    return(
        <nav className={nav_class}>
            <div className={'flex items-center'}>
                <div>
                    <Link href={"/"} className='h-full'>
                        <Image alt='Home page link' src={logo} height={48}></Image>
                    </Link>
                </div>
                {
                    links && links.map((link)=>(<Link className={link_class} href={link.href}>{link.lable}</Link>))
                }
            </div>
            <User/>
        </nav>
    )
}
