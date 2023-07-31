import { RequireAuth } from '@/contexts/auth';
import { Navbar } from '@/components/navbar';

const ProblemDetailLayout = ({ children }) =>{
    return(
        <div className='flex flex-col h-screen'>
            <header className='bg-black'>
                <Navbar links={[
                    {href: '/problem/list', lable: `問題`},
                    {href: '/about', lable: '關於'}
                ]}/>
            </header>
            <main className="py-10 px-4 grow h-full">
                <RequireAuth>
                    {children}
                </RequireAuth>
            </main>   
        </div>
    )
}

export default ProblemDetailLayout;