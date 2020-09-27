import React, { useState } from 'react';
import SubmitPlayer from './submitPlayer';
import createNewGame from './GameApi';
import createGameUUID from './createGameId';
import { useHistory, useParams } from 'react-router-dom';

//This is the common Registration from for both the player
// To identify the current player registration is important

const RegisterPlayer: React.FC = () => {
    const history = useHistory();
    //get the params through the url
    const { gameId, playerRegistration } = useParams();
    const [playerName, updatePlayerName] = useState('');

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        updatePlayerName(event.target.value);
    }
    function apiCall(event: React.FormEvent<HTMLButtonElement>): void {
        event.preventDefault();
        // create a game Id, send the player name as well
        const currentRegisterPlayerDetails = {
            playerName: event.currentTarget.value,
            //create gameId only for new game request
            gameId: gameId == undefined ? createGameUUID() : gameId,
        };
        createNewGame(currentRegisterPlayerDetails)
            .then(res => res.text())
            .then(res => {
                if (res !== '') {
                    const resObj = JSON.parse(res);
                    if (!resObj.beginGame) {
                        const player1Info = {
                            player1Name: resObj.playerInfo.name,
                            password: resObj.playerInfo.password,
                            boardIdentity: playerRegistration,
                            gameId: resObj.gameId,
                        };

                        history.push({ pathname: `/add-second-player`, state: { ...player1Info } });
                    } else {
                        //It comes here when both the player are register and makes call to board Component
                        const playerInfo = {
                            player1Name: resObj.playerInfo.player1Name,
                            player2Name: resObj.playerInfo.player2Name,
                            boardIdentity: playerRegistration,
                            gameId: resObj.gameId,
                            password: resObj.playerInfo.password,
                        };

                        history.push({ pathname: `/board/${playerInfo.boardIdentity}`, state: playerInfo });
                    }
                }
            });
    }

    return (
        <React.Fragment>
            <SubmitPlayer onChange={handleOnChange} onClick={apiCall} value={playerName} />
        </React.Fragment>
    );
};

export { RegisterPlayer };
