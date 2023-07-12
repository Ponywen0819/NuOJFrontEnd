import Link from "next/link";

const Time = ({data}) =>{
    const year = data.slice(0, 4);
    const month = data.slice(4, 6);
    const day = data.slice(6, 8);
    const hour = data.slice(9,11);
    const minumn = data.slice(11, 13)
    const sec = data.slice(13, 15);
    const utc = parseInt(data.slice(15, 18));
    
    return (
        <p className="text-sm">
            {`${year}/${month}/${day}`}
            <br/>
            {`${hour}:${minumn}`} 
            <sub>{`utc${(utc >= 0)? "+": ""}${utc}`}</sub>
        </p>
    );
}

const Sec = ({data}) => {
    let total = parseInt(data);
    let output = '';

    while(total){
        let temp = total % 60;
        output += `:${temp}`;
        total = (total-temp) / 60;
    }

    return(
        <p>{output.slice(1)}</p>
    )
}

const Content = ({type, data}) =>{
    switch (type){
        case "link" :
            return (<Link href={data.href}>{data.lable}</Link>);
        case "time":
            return (<Time data={data}></Time>);
        case "sec":
            // return (<Sec data={data}></Sec>);
            return <p>{`${data}ms`}</p>
        default:
            return (<p>{data}</p>);
    }
}

export const Data = ({conf, data}) =>{
    const type = conf.type;

    return(
        // <td className={`px-6 py-4`} style={{width: `${conf.width}%`}}>
        <td className={`py-4`} style={{width: `${conf.width}%`}}>
            <Content type={type} data={data}/>
        </td>
    )
} 