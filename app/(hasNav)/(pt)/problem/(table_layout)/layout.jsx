
import logo_min from '@/public/logo_min.png';
import Image from 'next/image';

export default function TableLayout({ children }) {
    return (
            <div className='flex'>
                <div className='grow px-3'>
                    {children}
                </div>
                <aside className="w-72 h-fit px-3">
                    <div className='bg-white w-full rounded-xl p-3'>
                        <Image width={128} height={128} alt='' className="mx-auto" src={logo_min}/>
                        <p className="text-2xl text-center p-5"> NuOJ Lab </p>
                    </div>
                </aside>
            </div>
    );
  }