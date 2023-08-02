import { useContext, cloneElement, useLayoutEffect, useEffect } from 'react';
import { table_context } from './table';
import { getValidChildren } from './utils/reactChildren';
import { quickSort } from './utils/sort';

export const Body = ({
    children,
    pageSize
})=>{
    const { index, order, updateMax } = useContext(table_context);
    const validChildren = getValidChildren(children).map((child)=>{
        const valid = getValidChildren(child.props.children);
        return cloneElement(
            child,
            { 
                ...child.props,
                represent: valid?.[ order?.index || 0 ]?.props?.children || ''
            },
            valid
        )
    })

    const orderedChilren = order?(
        (order.ascending)?(
            quickSort(validChildren, (a, b)=>(
                a.props.represent > b.props.represent 
            ))
        ):(
            quickSort(validChildren, (a, b)=>(
                a.props.represent  < b.props.represent 
            ))
        )
    ):(validChildren);

    const lowwerBound = pageSize?(
        index * pageSize
    ):0;

    const upperBound = pageSize?(
        lowwerBound + pageSize
    ):orderedChilren.length;
    const slicedChildren = orderedChilren.slice(lowwerBound, upperBound);
    
    // console.log(slicedChildren)

    useLayoutEffect(()=>{
        updateMax(pageSize?Math.ceil(orderedChilren.length / pageSize): 1)
    },[]);

    return(
        <div role='table body' className='divide-y'>
            { slicedChildren }
        </div>
    )
}

export const Row = ({
    children
})=>{
    const { widths } = useContext(table_context);
    const validChildren = getValidChildren(children);

    const Normalized = validChildren.filter((_, index)=>
        widths[index]
    ).map((child, index)=>(
        cloneElement(
            child,
            {
                width: widths[index],
                ...child.props,
            },
            child.props.children
        )
    ))

    return(
        <div role='table row' className='hover:bg-slate-100 bg-white block flex'>
            { Normalized }
        </div>
    )
}

export const Cell = ({
    width,
    as = (<p/>),
    children,
    ...props
 })=>{
    const cell =  cloneElement(as, props, children)
    return(
        <div     
            className={`py-3 inline-block`}
            style={{
                width
            }}
        >
            <div className='mx-auto block w-fit'>
                { cell }
            </div>
        </div>
    )
}