export const Time = ({data}) =>{
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

export const Sec = ({data}) => {
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
