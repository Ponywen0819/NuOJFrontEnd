import { Navbar } from "@/components/Navbar";

const HsaNav = ({ children })=>{
    return(
        <>
            <Navbar/>
          {children}
        </>
    )
}

export default HsaNav;