import arrow from '@/public/arrow-left.svg';
import Image from 'next/image';

import { useContext } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { IconButton, Fade } from '@chakra-ui/react';
import { table_context } from './table';


export const Selector = ({
    unmountAtOne = false
})=>{
    const { max, index, updateIndex } = useContext(table_context);
    const buff = new Array(max).fill(0);
    return (unmountAtOne && max === 1)? "":(
        <div className='w-full py-3 bg-white' >
            <div className='mx-auto w-fit flex justify-center gap-1'>
                <div className='w-8'>
                    <Fade in={(index !== 0)} unmountOnExit={true}>
                        <IconButton 
                            size={"sm"} 
                            icon={<ChevronLeftIcon/>} 
                            onClick={()=>updateIndex(index -1)}
                        />
                    </Fade>
                </div>
                {
                    buff.map((_, i)=>(
                        <button 
                            key={`page${i}`} 
                            onClick={()=>updateIndex(i)} 
                            className={`w-5 ${((i === index)?'border-2 bg-white rounded-lg':'')}`}
                        >
                            {i + 1}
                        </button>
                    ))
                }
                <div className='w-8'>
                    <Fade in={(index < (max - 1))}  unmountOnExit={true}>
                        <IconButton 
                            size={"sm"} 
                            icon={<ChevronRightIcon/>} 
                            onClick={()=>updateIndex(index + 1)}
                        />
                    </Fade>
                </div>
            </div>
        </div>
    );
}
