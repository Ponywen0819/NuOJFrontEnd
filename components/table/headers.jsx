import { useContext } from 'react';
import { table_context } from './table';
import { IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon} from '@chakra-ui/icons';

export const Header = ()=>{
    const { config, order } = useContext(table_context);


    return (
        <div role='table header' className='flex'>
            {config.map((cloumn_config) =>(<HeaderColumn config={cloumn_config} order={order}/>))}
        </div>
    )
}

const HeaderColumn = ({config, order})=>{
    const { key, width, text } = config;
    const { ascending, descending } = (order?.key === key) && order;
    const { updateOrder } = useContext(table_context)

    const renderBtn = ()=>{
        if((order?.key === key)){
            return(
                <>
                    {(ascending) && <ChevronUpIcon display={'block'}/>}
                    {(descending) && <ChevronDownIcon display={'block'}/>}
                    
                </>
            )
        }
        else{
            return (
                <>
                    <ChevronUpIcon display={'block'}/>
                    <ChevronDownIcon display={'block'}/>
                </>
            )
        }
    }

    return(
        <div
            role='header column' 
            className={`py-3 inline-block bg-orange-200  ${width || 'grow'}`}
            style={{width: `${width}\%`}} >
            <button  
                className='mx-auto w-fit overflow-x-auto block flex items-center gap-1'
                onClick={()=>updateOrder(key)}
            >
                <span className='text-lg font-semibold whitespace-nowrap'>{text}</span>
                <div className='inline-block w-4'>
                    {renderBtn()}
                </div>
            </button>
        </div>  
    )
}