import logo_min from '@/public/logo_min.png';
import Image from 'next/image';

import { Subnav } from '@/components/subnav';

export default function TableLayout({ children }) {
    return (
            <>
                <Subnav links={[
                        {href: '/problem/list', lable: '問題列表'},
                        {href: '/problem/submition', lable: '提交狀態'}
                ]}/>
                <div className='flex gap-3'>
                    <div className='grow'>
                        {children}
                    </div>
                    <aside className="w-72 h-fit">
                        <div className='bg-white w-full rounded-xl p-3'>
                            <Image width={128} height={128} alt='' className="mx-auto" src={logo_min}/>
                            <p className="text-2xl text-center p-5"> NuOJ Lab </p>
                        </div>
                    </aside>
                </div>
            </>
            
    );
  }