import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { requestPlayer2Details } from './serverRequest';

interface GameInfo {
    player1Name: string;
    gameId: string;
    password: string;
    boardIdentity: string;
    player2Name: string;
}
//TODO: PlayerRegisrtation-boardIdentity
const AddSecondPlayer = (): JSX.Element => {
    const history = useHistory();
    const location = useLocation<GameInfo>();
    const gameInfo = {
        gameId: location.state.gameId || '',
        boardIdentity: location.state.boardIdentity,
        player1Name: location.state.player1Name,
        password: location.state.password,
        player2Name: 'waiting',
    };
    console.log('GameInfo is', gameInfo, location.state);

    const intervalId: number = window.setInterval(() => {
        requestPlayer2Details(gameInfo).then(registeredGameInfo => {
            if (registeredGameInfo != null) {
                console.log('After Getting the playerName2', registeredGameInfo.player2Name);
                if (registeredGameInfo.player2Name !== 'waiting') {
                    console.log(registeredGameInfo.boardIdentity);
                    gameInfo.player2Name = registeredGameInfo.player2Name;
                    history.push({ pathname: `/board/${registeredGameInfo.boardIdentity}`, state: gameInfo });
                    clearInterval(intervalId);
                }
            }
        });
    }, 2000);

    return (
        <React.Fragment>
            <h1>player1: {gameInfo.player1Name}</h1>
            <h1>Invite Player2 with the given link</h1>
            <p style={{ color: 'red' }}>
                <span id={'share-link'}>{`http://localhost:3000/register-player2/player2/${gameInfo.gameId}`}</span>
            </p>
        </React.Fragment>
    );
};

export default AddSecondPlayer;
