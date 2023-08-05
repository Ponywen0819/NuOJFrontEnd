import { Link } from '@/components/chakra';
import NextLink from 'next/link';

export const NavLink = ({
    href,
    children
})=>{
    return(
        <Link 
            as={NextLink} 
            href={href}
            borderBottomWidth={'2px'}
            borderColor={'rgba(0,0,0,0)'}
            color={"whiteAlpha.900"}
            fontWeight={'bold'}
            fontSize={'lg'}
            _hover={{
                "borderColor" : "whiteAlpha.900"
            }}
        >
            {children}
        </Link>
    )
}