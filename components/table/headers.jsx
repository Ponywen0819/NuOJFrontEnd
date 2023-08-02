import { useContext, useLayoutEffect, cloneElement } from 'react';
import { table_context } from './table';
import { getValidChildren } from './utils/reactChildren';
import { ChevronDownIcon, ChevronUpIcon} from '@chakra-ui/icons';

export const Header = ({
    backgroundColor = 'rgb(254 215 170)',
    width = '100%',
    height = '100%',
    children,
})=>{
    const { widths, updateWidth } = useContext(table_context);
    const validChildren =  getValidChildren(children);
    
    const columnsWidth = validChildren.map((element)=>{
            const { width = '0%' } = element.props;
            return width;
    });

    const Normalized = validChildren.map((element, index)=>{
            return cloneElement(
                element,
                { 
                    width: widths[index], 
                    index,
                    ...element.props,
                },
                element.props.children
            )
    });


    useLayoutEffect(()=>{
        updateWidth(columnsWidth);
    },[])

    return (
        <div 
            role='table header' 
            className='flex'
            style={{
                backgroundColor,
                width,
                height,
            }}
        >
            { Normalized }
        </div>
    )
}

export const HeaderColumn = ({
    key,
    index,
    width =  '',
    height = '100%',
    children
})=>{
    const { order, updateOrder } = useContext(table_context);

    return(
        <div
            role='header column' 
            className={`py-3`}
            style={{
                width,
                height
            }} 
        >
            <button  
                className='mx-auto w-fit overflow-x-auto block flex items-center gap-1'
                onClick={()=>updateOrder(index)}
            >
                <span className='text-lg font-semibold whitespace-nowrap'>{children}</span>
                <div className='inline-block w-4'>
                    {/* {renderBtn()} */}
                    { (order?.index === index) ? (
                        order.ascending?(
                            <ChevronUpIcon display={'block'}/>
                        ):(
                            <ChevronDownIcon display={'block'}/>
                        )
                    ):(
                        <>
                            <ChevronUpIcon display={'block'}/>
                            <ChevronDownIcon display={'block'}/>      
                        </>
                    )}
                </div>
            </button>
        </div>  
    )
}