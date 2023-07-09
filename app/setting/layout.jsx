import { RequireAuth } from '@/contexts/auth';

export const metadata = {
    title: "設定"
};


export default function SettingLayout({ children }) {
    return (
        <RequireAuth>
            <main>
                <aside></aside>            
                <section>
                    {children}
                </section>
            </main>
        </RequireAuth>
    );
  }