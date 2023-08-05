'use client'

import { Navbar } from '@/components/navbar';
import { useContext } from 'react';
import { auth_context } from '@/contexts/auth';
import Loading from './loading';
import { redirect } from 'next/navigation';

const AdminLayout = ({ children })=>{
    const { user } = useContext(auth_context);


    return(
        <>
            <header className='bg-black'>
                <Navbar/>
            </header>
            <main className="mx-auto max-w-7xl py-10 px-4">
                {
                    (user) ?(
                        (user.role)?(
                            children
                        ):(
                            redirect("/")
                        )
                    ):(
                        <Loading/>
                    )
                }
            </main>
        </>
    )
}

export default AdminLayout;