import { useContext, cloneElement } from 'react';
import { table_context } from './table';

export const Body = ({datas})=>{
    // const { datas } = useContext(table_context);

    return(
        <div role='table body' className='divide-y'>
            {datas.map(( data )=>( <Row data={data}/> ))}
        </div>
    )
}

const Row = ({ data })=>{
    const { config } = useContext(table_context);

    return(
        <div role='table row' className='hover:bg-slate-100 bg-white block flex'>
            {config.map(( column_config )=>( <Cell data={data[column_config.key]} config={column_config}/> ))}
        </div>
    )
}

const Cell = ({ data, config })=>{
    const { render, width } = config;
    const cell =  cloneElement((render || <p/>), data, (data?.text || data))

    return(
        <div     
            className={`py-3 inline-block  ${width || ''}`}
            style={width && {width: `${width}\%`}} 
        >
            <div className='mx-auto block w-fit'>
                { cell }
            </div>
        </div>
    )
}