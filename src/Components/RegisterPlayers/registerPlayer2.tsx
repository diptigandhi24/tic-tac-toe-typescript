import React, { useState } from 'react';
import RegistrationForm from './registerationForm';
import { registerPlayer2 } from './serverRequest';
import { useHistory, useParams } from 'react-router-dom';

interface ParamTypes {
    gameId: string;
    playerRegistration: string;
}
function RegisterPlayer2(): JSX.Element {
    const history = useHistory();
    const { gameId, playerRegistration } = useParams<ParamTypes>();
    const [playerName, updatePlayerName] = useState('');
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        updatePlayerName(event.target.value);
    }

    function submitPlayer2Details(event: React.FormEvent<HTMLButtonElement>): void {
        event.preventDefault();
        const player2Details = {
            playerName: event.currentTarget.value,
            gameId: gameId,
        };
        //requesting-player2-details
        registerPlayer2(player2Details).then(resObj => {
            if (resObj !== null) {
                const playerInfo = {
                    player1Name: resObj.playerInfo.player1Name,
                    player2Name: resObj.playerInfo.player2Name,
                    boardIdentity: playerRegistration,
                    gameId: resObj.gameId,
                    password: resObj.playerInfo.password,
                };
                history.push({ pathname: `/board/${playerInfo.boardIdentity}`, state: playerInfo });
            }
        });
    }

    return <RegistrationForm onChange={handleOnChange} onClick={submitPlayer2Details} value={playerName} />;
}

export default RegisterPlayer2;
