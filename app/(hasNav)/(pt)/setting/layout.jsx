import { RequireAuth } from '@/contexts/auth';
import { SettingNav } from '@/components/SettingAside';

export const metadata = {
    title: "設定"
};


export default function SettingLayout({ children }) {
    const links = [
        {href: "/profile", title: '個人資訊'}
    ]

    return (
        <RequireAuth>
            <div className='mx-auto max-w-5xl flex'>
                <SettingNav links={links} />
                <section className='grow px-3'>
                    {children}
                </section>
            </div>
        </RequireAuth>
    );
  }