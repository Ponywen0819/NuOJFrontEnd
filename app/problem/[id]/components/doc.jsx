import { MathComponent } from 'mathjax-react';


const TexSupport = ({text}) =>{
    let res = [];
    let from = 0;
    text.slice(from).replaceAll(/(\$.*\$)/g,(match, _, offset, string) =>{
        if(offset !== 0){
            res.push(<span>{string.slice(0, offset - 1)}</span>);
        }
        res.push(<MathComponent display={false} tex={match.slice(1, -1)}/>);
        from += match.length + offset;
    });
    
    if(from !== text.length){
        res.push(<span>{text.slice(from)}</span>);
    }

    return (<p className='py-1'>{res}</p>);
}

export const DocArea = ({ data = {} })=>{

    const lines = [
        {key: "description", lable: '題目敘述'},
        {key: "input_description", lable: '輸入說明'},
        {key: "output_description", lable: '輸出說明'},
        {key: "note", lable: '備註'}
    ]

    return( 
        <>
            <div className="text-center">
                <p id="title" className="text-4xl font-medium my-2"> {data?.title} </p>
                <p id="TL-text" className="text-lg font-medium my-2"> 程式運行時間限制（TL）：{data?.tl} 秒</p>
                <p id="ML-text" className="text-lg font-medium my-2"> 程式運行時間限制（ML）：{data?.ml} MB</p>
            </div>
            {
                lines.map((line)=>{
                    return(
                        <div key={`${line.key}`}>
                            <p className="text-xl font-semibold my-5">{line.lable}</p>
                            {
                                data[line.key]?.split("\n").map((l,index)=>(
                                    <TexSupport key={`${line.key}:${index}`} text={l}/>
                                ))
                            }
                        </div>
                    )
                })
            }
        </>
    );
}