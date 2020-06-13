import React, { ReactElement } from 'react';
import '../board.css';
//create a board using two dimensional array
export default function Board() {
    let col: Array<ReactElement> = [];

    function createBoard(boardLength: number) {
        for (let i = 0; i < boardLength; i++) {
            for (let j = 0; j < boardLength; j++) {
                col.push(<li></li>);
            }
            col.push(<br></br>);
        }
        return col;
    }
    return <ul>{createBoard(3)}</ul>;
}
