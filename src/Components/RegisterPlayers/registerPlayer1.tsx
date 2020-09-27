import React, { useState } from 'react';
import RegistrationForm from './registerationForm';
import createNewGame from '../../GameApi';
import createGameUUID from '../../createGameId';
import { useHistory, useParams } from 'react-router-dom';

interface ParamTypes {
    gameId: string;
    playerRegistration: string;
}
function RegisterPlayer1() {
    const history = useHistory();
    const { gameId, playerRegistration } = useParams<ParamTypes>();
    const [playerName, updatePlayerName] = useState('');
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        updatePlayerName(event.target.value);
    }

    function submitPlayer1Details(event: React.FormEvent<HTMLButtonElement>): void {
        event.preventDefault();
        const player1Details = {
            playerName: event.currentTarget.value,
            gameId: createGameUUID(),
        };
        createNewGame(player1Details)
            .then(res => res.text())
            .then(res => {
                if (res !== '') {
                    const resObj = JSON.parse(res);

                    const player1Info = {
                        player1Name: resObj.playerInfo.name,
                        password: resObj.playerInfo.password,
                        boardIdentity: playerRegistration,
                        gameId: resObj.gameId,
                    };

                    history.push({ pathname: `/add-second-player`, state: { ...player1Info } });
                } else {
                    console.log('No response fromt the server');
                }
            });
    }

    return <RegistrationForm onChange={handleOnChange} onClick={submitPlayer1Details} value={playerName} />;
}

export default RegisterPlayer1;
