import { OauthProvider } from '@/contexts/oauth';

const noNav = ({ children })=>{
    return(
        <OauthProvider>
            {children}
        </OauthProvider>
    )
}

export default noNav;