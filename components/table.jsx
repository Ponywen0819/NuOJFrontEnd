"use client";

import { Data }from '@/components/table_type';
import { TableLoading } from '@/components/table_loading';
import { Seleter } from "@/components/table_selecter";
import { useState } from "react";

const Header = ({width, lable = ''})=>{
    return(
        <th 
            key={lable}
            scope="col"
            // className={`px-6 py-3`}
            className={`py-3`}
            style={{width: `${width}\%`}} 
        >{lable}</th>
    )
}

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
        new_col.type = col.type || "text";
        return new_col
    })

    return new_cols;

}

export const Table = ({cols, datas, line_per_page})=>{
    let norma_cols = normalizeCol(cols);
    const [index, setIndex] = useState(0);

    const selectPage = (page) =>{
        console.log(page, index)
        if(page !== index){
            setIndex(page);
        }
    }
    const offset = index * line_per_page;

    return(
        <>
            <div className="w-full rounded-lg overflow-hidden border-2">
                <table className="relative  w-full text-lg border-0 text-black text-center whitespace-nowrap leading-normal">
                    <thead className="bg-orange-200">
                        <tr className="">
                            {
                                norma_cols.map((col)=>Header({...col}))
                            }   
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            datas && (datas.slice(offset , offset+line_per_page)?.map((data, index)=>(
                                <tr className="hover:bg-slate-100 border bg-white" key={`${data[0]}:${index}`}>
                                {
                                    data.map((col, index)=>(
                                        <Data conf={norma_cols[index]} data={col} key={`${data[0]}:${index}`}/>
                                    ))
                                }
                                </tr>
                            )))
                        }
                    </tbody>
                </table> 
            </div>
        <Seleter index={index}  max={datas? Math.ceil((datas.length) / line_per_page) : 1} setpage={selectPage}/>
    </>);
}