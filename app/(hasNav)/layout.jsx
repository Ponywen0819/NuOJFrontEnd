import { Navbar } from "@/components/Navbar";

const HsaNav = ({ children })=>{
    return(
        <>
            <Navbar
            links={[
              { title: "題目", href: "/problem" },
              { title: "關於", href: "/about" },
              { title: "狀態", href: "/status" },
            ]}
          />
          {children}
        </>
    )
}

export default HsaNav;