import { useEffect, createContext, useState } from 'react';
import { Header } from './headers';
import { Body } from './body';
import { Selector } from './selector';
import { quickSort } from './sort';

export const table_context = createContext(null);


const normalizeCol = (cols)=>{
    let remain = 100;
    let len =  cols.length;
    cols.map((col)=>{
        if(col.width){
            remain = remain - col.width;
            len --;
        }
    });

    let remain_w = Math.round( remain / len);
    let new_cols= cols.map((col)=>{
        let new_col = {...col};
        new_col.width = col.width || remain_w;
        return new_col
    })

    return new_cols;
}

export const Table = ({
    rawconfig,
    rawdata,
    pageSize
})=>{
    const [datas, setDatas] = useState(rawdata || []);
    const [index, setIndex] = useState(0);
    const [order, setOrder] = useState(null);
    const [loading, setState] = useState(true);
    const config = normalizeCol(rawconfig)
    const dataCount = datas.length;

    useEffect(()=>{setDatas(rawdata || [])},[rawdata]);

    const updatePageIndex = (index)=>{
        if(index <= 0) setIndex(0);
        else if((pageSize * index) >= dataCount) setIndex(Math.ceil(dataCount / pageSize) -1);
        else setIndex(index);
    }

    const updateOrder = (new_key) =>{
        if(order){
            const { key, ascending, descending } = order;
            if((new_key === key) && ascending){
                setOrder({key: new_key, ascending: false, descending: true});
                setDatas(quickSort(datas,(a,b) => {
                    const com_a = a[new_key]?.text || a[new_key];
                    const com_b = b[new_key]?.text || b[new_key];
                    return com_a > com_b;
                }));
            } 
            else if((new_key === key) && descending){
                setOrder({key: new_key, ascending: true, descending: false});
                setDatas(quickSort(datas, (a,b) => {
                    const com_a = a[new_key]?.text || a[new_key];
                    const com_b = b[new_key]?.text || b[new_key];
                    return com_a < com_b;
                }));
            } 
            else {
                setOrder(null)
                setDatas(rawdata||[]);
            }
        }
        else{
            setOrder({key: new_key, ascending: false, descending: true})
            setDatas(quickSort(datas, (a,b) => {
                const com_a = a[new_key]?.text || a[new_key];
                const com_b = b[new_key]?.text || b[new_key];
                return com_a > com_b;
            }));
        }

    }

    const context = {
        updatePageIndex, 
        updateOrder, 
        datas, 
        config, 
        index, 
        pageSize, 
        dataCount, 
        order
    }

    const offset = index * pageSize;
    return(
        <table_context.Provider value={context}>
            <div role='table' className='rounded-lg overflow-x-hidden border-2 w-full divide-y'>
                <Header/>
                <Body datas={datas.slice(offset, offset + pageSize )}/>
                <Selector/>
            </div>
        </table_context.Provider>
    );
}