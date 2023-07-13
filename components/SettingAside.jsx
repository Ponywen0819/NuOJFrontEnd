"use client";

import Link from 'next/link';

export const SettingNav = ({links}) =>{
    const link_class = `w-full border-b-2 border-black border-opacity-0 duration-500 hover:border-black hover:border-opacity-100`
    return(
        <aside className='w-48 px-3'>
            <div className='shadow-2xl rounded-lg bg-white border-2 p-2 flex flex-col'>
                {
                    links?.map((link)=>(
                        <Link href={`/setting${link.href}`} className={link_class} key={link.href}>{link.title}</Link>        
                    ))
                }
            </div>
        </aside>
    )
}

