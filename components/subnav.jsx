"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Tab = ({href, lable})=>{
    const path = usePathname();
    const link_active = 'border-b-2 border-orange-500 border-opacity-100'
    const link_class = "text-black text-sm inline-block h-6 px-4"

    return(
        <li className={`inline-block transition-all duration-500 border-opacity-0 ${(path === href)?link_active:''}`}>
            <Link className={link_class} href={href}>{lable}</Link>
        </li>
    )
}


export const Subnav = ({ links })=>{
    const nav_class = `w-full h-fit mb-2 px-2 border-b-2 border-gray`

    return(
        <nav className={nav_class}>
            <ul>
                {
                    links && links.map((link)=>(<Tab href={link.href} lable={link.lable}/>))
                }
            </ul>
        </nav>
    )
}
