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
    const [myTurn, setMyturn] = useState(location.state.boardIdentity == 'player2' ? true : false);
    const [player, nextPlayer] = useState<Array<string>>(Array(16).fill(''));
    useEffect(() => {
        console.log('After updating the state useEffect', player);
        setMyturn(preState => !preState);
        console.log('Is it my turn', myTurn);
    }, [player]);
    const boardIdentity = location.state.boardIdentity;
    const boardChar = boardIdentity == 'player1' ? 'X' : 'O';
    const rivalChar = boardChar == 'X' ? 'O' : 'X';
    const rivalPlayer = boardIdentity == 'player1' ? 'player2' : 'player1';
    console.table({ boardIdentity, rivalPlayer, boardChar, rivalChar });
    const communicationInfo = {
        gameId: location.state.gameId,
        player: location.state.boardIdentity,
        password: location.state.password,
    };
    const [declareWinner, setWinner] = useState(' ');

    function updateboardFeild(updateInfo: { id: string; rowId: string; colId: string }, currentChar: string): void {
        const { id, rowId, colId } = updateInfo;
        let playerCharacter = '';
        if (currentChar == boardIdentity) {
            playerCharacter = boardChar;
        } else {
            playerCharacter = rivalChar;
        }
        // setCharacter(boardIdentity == 'player1' ? 'x' : 'o');
        nextPlayer(prevState => {
            const updateBoard: Array<string> = [...prevState];
            updateBoard[parseInt(id)] = playerCharacter;
            return updateBoard;
        });
        // setMyturn(preState => !preState);
        // console.log('After updating myTurn', myTurn);
        const result = lookForWinner(rowId, colId, playerCharacter);
        if (result != 'Done') {
            setWinner(result);
        }
    }

    async function requestForNextMove(): Promise<any> {
        const requestMove = { ...communicationInfo };
        let clearIntervaltest = false;
        // let count = 0;
        while (clearIntervaltest == false) {
            await new Promise(resolve => setTimeout(resolve, 15000));
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
                        if (resObj.yourTurn == true) {
                            // console.log('Inside If condition of update res');
                            clearIntervaltest = true;
                            console.log('Received', resObj.id, resObj.rowId, resObj.colId);
                            updateboardFeild({ id: resObj.id, rowId: resObj.rowId, colId: resObj.colId }, rivalPlayer);
                        } else {
                            console.log('Waiting');
                        }
                    });
            }
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

        setTimeout(() => {
            requestForNextMove();
            console.log('Successfully waited before asking for player move');
        }, 20000);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        const id = event.currentTarget.id;
        const rowId = event.currentTarget.dataset.rowid || '';
        const colId = event.currentTarget.dataset.colid || '';
        updateboardFeild({ id, rowId, colId }, boardIdentity);
        updatePlayerMove(rowId, colId, id);
    };
    function printRow(): JSX.Element[] {
        const boardlength = 4;
        const board = [];
        let count = 0;
        for (let row = 0; row < boardlength; row++) {
            //prints the coloumn
            for (let col = 0; col < boardlength; col++) {
                // console.log('Value of count', count);
                board.push(
                    <Square
                        key={count}
                        id={`${count}`}
                        rowId={row}
                        colId={col}
                        value={player[count]}
                        onClick={handleClick}
                    />,
                );
                count = count + 1;
            }

            // board.push(<br></br>);
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
            <h4>{myTurn == true ? 'make a move' : 'waiting for other player'}</h4>
            <ul className={myTurn == true ? 'enabled' : 'disabled'}>{printRow()}</ul>
        </div>
    );
};
export default Board;
