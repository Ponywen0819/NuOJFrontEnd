import { ColorProvider } from '@/contexts/color';
import { OauthProvider } from '@/contexts/oauth';

const AuthLayout = ({ children })=>{
    return(
        <section className='min-h-screen'>
            <OauthProvider>
                <ColorProvider>
                    {children}
                </ColorProvider>
            </OauthProvider>
        </section>
    )
}

export default AuthLayout