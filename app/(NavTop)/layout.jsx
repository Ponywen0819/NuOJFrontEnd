import { Navbar } from '@/components/navbar';

const PaddingTop = ({ children })=>{
    return(
        <>
            <header className='bg-black'>
                <Navbar/>
            </header>
            <main className="mx-auto max-w-7xl py-10 px-4">
                {children}
            </main>    
        </>
    )
}

export default PaddingTop;