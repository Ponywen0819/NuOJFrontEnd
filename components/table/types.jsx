export const Date = ({
    children
}) =>{
    const year = children.slice(0, 4);
    const month = children.slice(4, 6);
    const day = children.slice(6, 8);
    const hour = children.slice(9,11);
    const minumn = children.slice(11, 13)
    const sec = children.slice(13, 15);
    const utc = parseInt(children.slice(15, 18));
    
    return (
        <p className="text-sm">
            {`${year}/${month}/${day}`}
            <br/>
            {`${hour}:${minumn}`} 
            <sub>{`utc${(utc >= 0)? "+": ""}${utc}`}</sub>
        </p>
    );
}

export const Time = ({
    children
}) => {
    let total = parseInt(children);
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
