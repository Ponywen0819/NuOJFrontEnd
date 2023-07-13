import Link from "next/link";
import { Data }from '@/components/table_type';
import { TableLoading } from '@/components/table_loading';

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

export const Table = ({cols, datas})=>{
    let norma_cols = normalizeCol(cols);

    return(
        <div className="w-4/5 m-5">
            <table className="relative rounded-lg overflow-hidden w-full text-lg text-black text-center relative whitespace-nowrap leading-normal">
                <thead className="bg-orange-200">
                    <tr className="">
                        {
                            norma_cols.map((col)=>Header({...col}))
                        }   
                    </tr>
                </thead>
                <tbody className="">
                    {
                        datas? (datas.map((data, index)=>(
                            <tr className="hover:bg-slate-100 border bg-white" key={`${data[0]}:${index}`}>
                            {
                                data.map((col, index)=>(
                                    <Data conf={norma_cols[index]} data={col} key={`${data[0]}:${index}`}/>
                                ))
                            }
                            </tr>
                        // <Row data={data} conf={norma_cols} key={`${data[0]}:${index}`}/>)
                        ))):<TableLoading/>
                    }
                </tbody>
            </table>
        </div>
    )
}