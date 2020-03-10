import React from 'react';

//create a single square input which displays the x or y;
const square = {
    width:'50px',
    height:'50px',
    border:'1px solid black',
    "background-color":"white"
}

interface Props {
value:string,
id:string
}
const Square = (props:Props) => {return <button id={props.id} style={square} value = {props.value}>{props.value}</button>}

export default Square;