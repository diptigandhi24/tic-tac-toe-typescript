import React, { memo } from 'react';
import './board.css';

interface Squareprops {
    value: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    id: string;
    rowId: number;
    colId: number;
}
const Square = memo(function SquareComponent(props: Squareprops): JSX.Element {
    // console.log('The row and col are', props.rowId, props.colId);
    return (
        <li key={props.id} id={props.id} onClick={props.onClick} data-rowid={props.rowId} data-colid={props.colId}>
            {props.value}
        </li>
    );
});

export default Square;
