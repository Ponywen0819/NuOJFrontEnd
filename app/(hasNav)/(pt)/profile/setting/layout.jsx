import { RequireAuth } from '@/contexts/auth';


export default function SettingLayout({ children }) {

    return (
        <RequireAuth>
            {children}
        </RequireAuth>
    );
  }