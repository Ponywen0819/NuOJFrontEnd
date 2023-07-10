import LogoMin from '@/public/logo_min.png'
import Link from 'next/link';

const ErrorPage = () =>{
  const errorContent = {
    404 : "404 Not Found :(",
    418 : "418 I'm a teapot 🫖",
    500 : "500 Internal Server Error :("
  }
  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[40vh] text-center">
        <Link href={'/'}>
            <img className="w-[50%] mx-auto" src={LogoMin.src}/>
        </Link>
        <p className="m-5 p-2 w-fit mx-auto text-2xl font-mono bg-orange-400 rounded-lg">{
          // errorContent[errorCode] || `Somthing wrong!Error Code is ${errorCode}`
          "404 Not Found :("
        }</p>
    </div>
  );
}

export default ErrorPage