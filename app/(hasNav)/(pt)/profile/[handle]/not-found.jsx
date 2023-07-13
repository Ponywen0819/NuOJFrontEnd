import Link from 'next/link';
import LogoMin from '@/public/logo_min.png'
import Image from 'next/image';

const ProfileNotFound = ()=>{
    return(
        <div className="text-center mx-auto h-48 flex flex-col justify-center">
            <p className="p-2 w-fit mx-auto text-2xl font-mono bg-orange-400 rounded-lg">{"404 Not Found :("}</p>
        </div>
        
    )
}

export default ProfileNotFound;