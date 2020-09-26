import React, { useState } from 'react';
import SubmitPlayer from './submitPlayer';
import createRequest from './GameApi';
import createGameUUID from './createGameId';
import { useHistory, useParams } from 'react-router-dom';

//This is the common Registration from for both the player
// To identify the current player registration is important

const RegisterPlayer: React.FC = () => {
    const history = useHistory();

    const [playerName, updatePlayerName] = useState('');
    const { gameId, playerRegistration } = useParams();
    console.log('Which Player Registration Form is this? Answer :', playerRegistration);
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        updatePlayerName(event.target.value);
    }

    function apiCall(event: React.FormEvent<HTMLButtonElement>): void {
        event.preventDefault();
        // create a game Id, send the player name as well
        const playerDetails = {
            playerName: event.currentTarget.value,
            gameId: gameId == undefined ? createGameUUID() : gameId,
        };
        console.log('getting the gameId', gameId, playerDetails.gameId);
        createRequest(playerDetails)
            .then(res => res.text())
            .then(res => {
                if (res !== '') {
                    console.log('Response from server', res, typeof res);
                    const resObj = JSON.parse(res);
                    console.log('Let print the resOBj', resObj.playerInfo.name);
                    // if resObj.beginGame === false
                    if (!resObj.beginGame) {
                        const player1Info = {
                            player1Name: resObj.playerInfo.name,
                            password: resObj.playerInfo.password,
                            boardIdentity: playerRegistration,
                            gameId: resObj.gameId,
                        };
                        console.log('Information send to Add Second player component', player1Info);
                        history.push({ pathname: `/add-second-player`, state: { ...player1Info } });
                    } else {
                        // if resObj.beginGame === true
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
