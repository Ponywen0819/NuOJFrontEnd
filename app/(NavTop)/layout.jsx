import { Navbar } from '@/components/navbar';

const PaddingTop = ({ children })=>{
    return(
        <>
            <header className='bg-black'>
                <Navbar links={[
                    {href: '/problem/list', lable: `問題`},
                    {href: '/about', lable: '關於'}
                ]}/>
            </header>
            <main className="mx-auto max-w-7xl py-10 px-4">
                {children}
            </main>    
        </>
    )
}

export default PaddingTop;