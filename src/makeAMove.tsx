//make a server Request with the id of an array
import React from 'react';

interface Props {
    value: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    id: string;
}
const Tquare = (props: Props) => {
    // return <input type="button" style={square} value={props.value} onClick={props.onClick} />;
    return (
        <li id={props.id} onClick={props.onClick}>
            {props.value}
        </li>
    );
};

export default Tquare;
