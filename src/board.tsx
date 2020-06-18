//create board of 3 x 3 which can later be converted to n x n
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Square from './square';
import './board.css';

import lookForWinner from './winnerDeclaration';

const Board: React.FC<{}> = () => {
    const location = useLocation<{
        player1Name: string | undefined;
        player2Name: string | undefined;
        gameId: string;
        password: string;
        boardIdentity: string;
    }>();
    console.log('Creating New Board Component');
    const [player, nextPlayer] = useState<Array<string>>(Array(9).fill(''));
    console.log('New State', player);
    useEffect(() => {
        console.log('After updating the state useEffect', player);
    });
    const [playerCharacter, setCharacter] = useState('x');
    const boardIdentity = location.state.boardIdentity;
    const communicationInfo = {
        gameId: location.state.gameId,
        player: location.state.boardIdentity,
        password: location.state.password,
    };
    const [declareWinner, setWinner] = useState(' ');
    // const [myTurn, setMyturn] = useState(location.state.boardIdentity == 'player1' ? true : false);
    // console.log('Print the boardIndentity', boardIdentity, typeof boardIdentity, communicationInfo.gameId);

    function updateboardFeild(updateInfo: { id: string; rowId: string; colId: string }): void {
        const { id, rowId, colId } = updateInfo;
        // const updateBoard = [...player];
        // console.log('OLD STATE THAT PASS TO AN EMPTY ARRAY', updateBoard, player);
        // setCharacter(prevState => {
        //     return prevState != 'x' ? 'x' : 'o';
        // });
        setCharacter('X');
        // console.log('Before board Value', id, updateBoard);
        // updateBoard[parseInt(id)] = playerCharacter;
        // console.log('After board Value', updateBoard[parseInt(id)], updateBoard, playerCharacter);
        // console.log('Updated state data', [...updateBoard], player);
        nextPlayer(prevState => {
            const updateBoard: Array<string> = [...prevState];
            updateBoard[parseInt(id)] = playerCharacter;
            return updateBoard;
        });
        // const result = lookForWinner(rowId, colId, playerCharacter);
        // if (result != 'Done') {
        //     setWinner(result);
        // }
        // setMyturn(preState => !preState);
    }

    function sleep(ms: number): Promise<number> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function requestForNextMove(): Promise<void> {
        const requestMove = { ...communicationInfo };
        let clearIntervaltest = false;

        while (clearIntervaltest == false) {
            await sleep(10000);
            if (requestMove.gameId != undefined) {
                // console.log('gameId is defined', requestMove.gameId);
                fetch(`http://localhost:5000/getplayermove`, {
                    method: 'post',
                    body: JSON.stringify(requestMove),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.text())
                    .then(res => {
                        const resObj = JSON.parse(res);
                        // console.log('player1 has made a move', resObj);
                        // if (clearIntervaltest == true) {
                        //     console.log('clear the interval');
                        //     clearInterval(nextRequest);
                        // }
                        if (resObj.yourTurn == true) {
                            // console.log('Inside If condition of update res');
                            clearIntervaltest = true;
                            console.log('Checking the access to state', player);
                            updateboardFeild({ id: resObj.id, rowId: resObj.rowId, colId: resObj.colId });

                            // setMyturn(preState => !preState);
                        }
                        return resObj;
                    });
            }
            // if (clearIntervaltest == true) {
            //     console.log('clear the interval');
            //     clearInterval(nextRequest);
            // }
            // if (requestMove.gameId != undefined) {
            //     console.log('gameId is defined', requestMove.gameId);
            //     fetch(`http://localhost:5000/getplayermove`, {
            //         method: 'post',
            //         body: JSON.stringify(requestMove),
            //         headers: { 'Content-Type': 'application/json' },
            //     })
            //         .then(res => res.text())
            //         .then(res => {
            //             const resObj = JSON.parse(res);
            //             console.log('player1 has made a move', resObj);
            //             if (resObj.yourTurn == true) {
            //                 console.log('Inside If condition of update res', resObj, nextRequest);
            //                 clearIntervaltest = true;
            //             }
            //             return resObj;
            //         })
            //         .then(res => {
            //             console.log('AfterClear function', nextRequest);
            //             if (res.yourTurn == true) {
            //                 setMyturn(preState => !preState);
            //                 updateboardFeild({ id: res.id, rowId: res.rowId, colId: res.colId });
            //             }
            //         });
            // }
        }
    }
    function updatePlayerMove(rowId: string, colId: string, squareId: string): void {
        const playerMove = {
            ...communicationInfo,
            rowId,
            colId,
            squareId,
        };
        fetch(`http://localhost:5000/updateplayermove`, {
            method: 'post',
            body: JSON.stringify(playerMove),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.text())
            .then(res => {
                console.log('Respond receive from the server', JSON.parse(res));
            });
        // setMyturn(preState => !preState);
        // requestForNextMove();
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        const id = event.currentTarget.id;
        const rowId = event.currentTarget.dataset.rowid || '';
        const colId = event.currentTarget.dataset.colid || '';
        updateboardFeild({ id, rowId, colId });
        updatePlayerMove(rowId, colId, id);
    };
    function printRow(): JSX.Element[] {
        const boardlength = 3;
        const board = [];
        let count = 0;
        for (let row = 0; row < boardlength; row++) {
            for (let col = 0; col < boardlength; col++) {
                // console.log('Value of count', count);
                board.push(
                    <Square id={`${count}`} rowId={row} colId={col} value={player[count]} onClick={handleClick} />,
                );
                count = count + 1;
            }

            board.push(<br></br>);
        }
        return board;
    }
    if (boardIdentity == 'player2') {
        console.log('I am player2 So requesting for Player1 Move');
        requestForNextMove();
    }
    return (
        <div>
            <h1>Lets begin the game</h1>
            <h4>Player1:{location.state.player1Name} </h4>
            <h4>Player2:{location.state.player2Name} </h4>
            {declareWinner == ' ' ? null : <h4>Winner is {declareWinner} </h4>}
            {/* <h4>{myTurn == true ? 'make a move' : 'waiting for other player'}</h4> */}
            {/* <ul className={myTurn == true ? 'enabled' : 'disabled'}>{printRow()}</ul> */}
            <ul className={'enabled'}>{printRow()}</ul>
            {console.log('updated player', player)}
        </div>
    );
};
export default Board;
