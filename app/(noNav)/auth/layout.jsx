import { ColorProvider } from '@/contexts/color';

const AuthLayout = ({ children })=>{
    return(
        <section className='min-h-screen'>
            <ColorProvider>
                {children}
            </ColorProvider>
        </section>
    )
}

export default AuthLayout