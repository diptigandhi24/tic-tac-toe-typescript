import React, { ReactElement, useState } from 'react';
import '../board.css';
//create a board using two dimensional array
export default function Board() {
    // let col: Array<ReactElement> = [];
    const [board] = useState(Array(16).fill(''));
    // function createBoard(boardLength: number) {
    //     for (let i = 0; i < boardLength; i++) {
    //         for (let j = 0; j < boardLength; j++) {
    //             col.push(<li></li>);
    //         }
    //         col.push(<br></br>);
    //     }
    //     return col;
    // }
    return (
        <ul>
            {board.map((item, index) => (
                <li key={index}>X</li>
            ))}
        </ul>
    );
}
