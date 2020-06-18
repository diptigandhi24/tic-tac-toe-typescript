import React, { memo, JSXElementConstructor } from 'react';
import './board.css';
import { Button } from '@storybook/react/demo';

//create a single square input which displays the x or y;
const square = {
    width: '50px',
    height: '50px',
    border: '1px solid black',
    'background-color': 'white',
    'text-align': 'center',
    padding: '0px',
    margin: '0px',
    'font-size': '18px',
    overflow: 'hidden',
};

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
