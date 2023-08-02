import { Children, isValidElement } from 'react';


export const getValidChildren = (children)=>{
    return Children.toArray(children).filter((child)=>
        isValidElement(child)
    )
}