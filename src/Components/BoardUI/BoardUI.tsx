import React from 'react';
import Square from './Square';

interface BoardDetail {
    boardSize: number;
    handleSquareClick: (event: React.MouseEvent<HTMLElement>) => void;
    boardState: Array<string>;
    visibility: string;
}
export default function Board(props: BoardDetail): JSX.Element {
    const { boardSize, handleSquareClick, boardState, visibility } = props;
    const board = [];
    let boardStateArrayIndex = 0;
    //Create N x N board from a single dimension Array
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            // console.log('Value of count', count);
            board.push(
                <Square
                    key={boardStateArrayIndex}
                    id={`${boardStateArrayIndex}`}
                    rowId={row}
                    colId={col}
                    value={boardState[boardStateArrayIndex]}
                    onClick={(event: React.MouseEvent<HTMLElement>): void => handleSquareClick(event)}
                />,
            );
            boardStateArrayIndex = boardStateArrayIndex + 1;
        }
    }
    return <ul className={visibility}>{board}</ul>;
}
