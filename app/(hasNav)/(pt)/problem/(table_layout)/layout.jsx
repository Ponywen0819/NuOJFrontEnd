import { RequireAuth } from '@/contexts/auth';
import logo_min from '@/public/logo_min.png';

export default function TableLayout({ children }) {
    const links = [
        {href: "/profile", title: '個人資訊'}
    ]

    return (
            <div className='flex'>   
                {children}
                <aside className="w-[20%] m-5  p-5 h-full bg-white rounded-xl">
                    <img className="w-[50%] mx-auto" src={logo_min.src}/>
                    <p className="text-2xl text-center p-5"> NuOJ Lab </p>
                </aside>
            </div>
    );
  }