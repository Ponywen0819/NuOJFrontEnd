import arrow from '@/public/arrow-left.svg';
import Image from 'next/image';


export const Seleter = ({max, index, setpage})=>{
    const buff = new Array(max).fill(0);
    return(
        <div className='w-full mt-3'>
            <div className='mx-auto w-fit flex justify-center gap-1'>
                {
                    (index !== 0) && (
                    <button onClick={()=>setpage(index -1)}>
                        <Image alt='' width={24} src={arrow} className='inline'/>
                    </button>)
                }
                {
                    buff.map((_, i)=>(
                        <button key={`page${i}`} onClick={()=>setpage(i)} className={`w-5 ${(i === index && 'border-2 bg-white rounded-lg')}`}>
                            {i + 1}
                        </button>
                    ))
                }
                {
                    (index !== (max - 1)) && (
                    <button onClick={()=>setpage(index + 1)}>
                        <Image alt='' width={24} src={arrow} className='inline rotate-180'/>
                    </button>)
                }
                
            </div>
        </div>
    );
}
