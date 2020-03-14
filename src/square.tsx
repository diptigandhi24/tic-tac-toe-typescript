import React from 'react';

//create a single square input which displays the x or y;
const square = {
    width:'50px',
    height:'50px',
    border:'1px solid black',
    "background-color":"white",
    "text-align":"center",
    padding:'0px',
    margin:'0px',
    'font-size':'18px',
    overflow:"hidden"
}

interface Props {
value:string,
id:string
}
const Square = (props:Props) => {return <input type="button" id={props.id} style={square} value = {props.value}/>}

export default Square;