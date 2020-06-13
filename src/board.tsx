//create board of 3 x 3 which can later be converted to n x n
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';
import Square from './square';
import './board.css';
import MakeAMove from './makeAMove';
import updateRowColumnMove from './winnerDeclaration';
// //Each board should know the player1Name, player2Name, gameId, password
// function Test(name: Location<{}> | undefined): JSX.Element {
//     if (name == undefined) {
//         return <h4>Invite player 2</h4>;
//     } else {
//         return <h4>Player2 : {name}</h4>;
//     }
// }

const Board: React.FC<{}> = () => {
    const location = useLocation<{
        player1Name: string | undefined;
        player2Name: string | undefined;
        gameId: string;
        password: string;
        boardIdentity: string;
    }>();

    const [player, nextPlayer] = useState<Array<string>>(Array(9).fill(''));
    const [playerCharacter, setCharacter] = useState('x');
    const boardIdentity = location.state.boardIdentity;
    const communicationInfo = {
        gameId: location.state.gameId,
        player: location.state.boardIdentity,
        password: location.state.password,
    };
    const [declareWinner, setWinner] = useState(' ');
    const [myTurn, setMyturn] = useState(location.state.boardIdentity == 'player1' ? true : false);
    console.log('Print the boardIndentity', boardIdentity, typeof boardIdentity, communicationInfo.gameId);

    function updateboardFeild(updateInfo: { id: string; rowId: string; colId: string }): void {
        const { id, rowId, colId } = updateInfo;
        const updateBoard: Array<string> = [...player];
        console.log('Selected box id');
        setCharacter(prevState => {
            return prevState != 'x' ? 'x' : 'o';
        });
        console.log('Before board Value', id, updateBoard);
        updateBoard[parseInt(id)] = playerCharacter;
        console.log('After board Value', updateBoard[parseInt(id)], updateBoard, playerCharacter);
        console.log('Updated state data', [...updateBoard], player);
        nextPlayer(updateBoard);
        const result = updateRowColumnMove(rowId, colId, playerCharacter);
        if (result != 'Done') {
            setWinner(result);
        }
        setMyturn(preState => !preState);
    }

    function requestForNextMove(): void {
        const requestMove = { ...communicationInfo };

        const nextRequest = setInterval(() => {
            if (requestMove.gameId != undefined) {
                console.log('gameId is defined', requestMove.gameId);
                fetch(`http://localhost:5000/getplayermove`, {
                    method: 'post',
                    body: JSON.stringify(requestMove),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.text())
                    .then(res => {
                        const resObj = JSON.parse(res);
                        console.log('player1 has made a move', resObj);
                        if (resObj.yourTurn == true) {
                            console.log('Inside If condition of update res', resObj, nextRequest);
                            clearInterval(nextRequest);
                            console.log('AfterClear function', nextRequest);
                            setMyturn(preState => !preState);
                            updateboardFeild({ id: resObj.id, rowId: resObj.rowId, colId: resObj.colId });
                        }
                    });
            }
        }, 5000);
        console.log('Request for move requestObj', nextRequest);
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
        const boardlength = 4;
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
            <h4>{myTurn == true ? 'make a move' : 'waiting for other player'}</h4>
            <ul className={myTurn == true ? 'enabled' : 'disabled'}>{printRow()}</ul>
        </div>
    );
};
export default Board;
