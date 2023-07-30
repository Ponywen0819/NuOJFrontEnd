import { Navbar } from '@/components/navbar';

import IndexImg from '@/public/index.jpg';
import ntut_logo from '@/public/ntut_logo.png';
import Image from 'next/image';


const Index = ()=>{
    return (
        <>
            <header className='absolute z-10 top-0 w-full'>
                <Navbar links={[
                    {href: '/problem/list', lable: `問題`},
                    {href: '/about', lable: '關於'}
                ]}/>
            </header>
            <div className={`min-h-screen w-full bg-cover`} style={{ backgroundImage: `url(${IndexImg.src})`}}>
                <div className="absolute h-full w-full bg-gray-900 bg-opacity-80"/>
                <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-center w-[80%]">
                    <p className="text-white text-5xl m-5 hover:text-gray-400 font-medium "> Welcome to NuOJ! </p>
                    <p className="text-white text-2xl m-5 hover:text-gray-400"> 一款來自 國立臺北科技大學 的線上程式評測系統 </p>
                    <p className="text-white text-2xl m-5 hover:text-gray-400"> 系統正在進行開發中，你可以追蹤<a className="text-orange-500" href="/dev_progress">我們的開發進度</a></p>
                </div>
                <div className="absolute bottom-14 w-full" id="icon">
                    <div className="w-full flex justify-center">
                        <div className="p-3 w-fit duration-500 bg-white hover:bg-slate-400">
                            <a href="https://ntut.edu.tw">
                                <Image src={ntut_logo}/>
                            </a>
                        </div>
                    </div>
                    <div className="w-fit mx-auto m-5">
                        <p className="text-white"> 2023, NuOJ Team. </p>
                    </div>
                </div>
            </div>
        </>
    )
};


export default Index;