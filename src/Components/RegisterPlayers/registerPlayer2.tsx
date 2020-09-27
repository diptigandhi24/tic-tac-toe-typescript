import React, { useState } from 'react';
import RegistrationForm from './registerationForm';
import createNewGame from '../../GameApi';
import createGameUUID from '../../createGameId';
import { useHistory, useParams } from 'react-router-dom';

interface ParamTypes {
    gameId: string;
    playerRegistration: string;
}
function RegisterPlayer2() {
    const history = useHistory();
    const { gameId, playerRegistration } = useParams<ParamTypes>();
    const [playerName, updatePlayerName] = useState('');
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        updatePlayerName(event.target.value);
    }

    function submitPlayer1Details(event: React.FormEvent<HTMLButtonElement>): void {
        event.preventDefault();
        const player2Details = {
            playerName: event.currentTarget.value,
            gameId: gameId,
        };
        createNewGame(player2Details)
            .then(res => res.text())
            .then(res => {
                if (res !== '') {
                    const resObj = JSON.parse(res);
                    const playerInfo = {
                        player1Name: resObj.playerInfo.player1Name,
                        player2Name: resObj.playerInfo.player2Name,
                        boardIdentity: playerRegistration,
                        gameId: resObj.gameId,
                        password: resObj.playerInfo.password,
                    };
                    history.push({ pathname: `/board/${playerInfo.boardIdentity}`, state: playerInfo });
                } else {
                    console.log('No response fromt the server');
                }
            });
    }

    return <RegistrationForm onChange={handleOnChange} onClick={submitPlayer1Details} value={playerName} />;
}

export default RegisterPlayer2;
