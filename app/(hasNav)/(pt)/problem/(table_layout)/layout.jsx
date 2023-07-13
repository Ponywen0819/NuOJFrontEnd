
import logo_min from '@/public/logo_min.png';
import Image from 'next/image';

export default function TableLayout({ children }) {
    const links = [
        {href: "/profile", title: '個人資訊'}
    ]

    return (
            <div className='flex'>
                <div className='w-4/5 px-3'>
                    {children}
                </div>
                <aside className="w-[20%]  px-3">
                    <div className='bg-white h-fit rounded-xl p-3'>
                        <Image width={128} height={128} alt='' className="mx-auto" src={logo_min}/>
                        <p className="text-2xl text-center p-5"> NuOJ Lab </p>
                    </div>
                </aside>
            </div>
    );
  }