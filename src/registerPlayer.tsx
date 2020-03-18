import React, { useState } from 'react';

import SubmitPlayer from './submitPlayer';
import RegisteredGame from './RegisteredGame';
import createRequest from './GameApi';
import Board from './board';
import { Link } from 'react-router-dom';
import { useHistory, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

const RegisterPlayer: React.FC = () => {
    const [serverResponse, setServerResponse] = useState('');
    const history = useHistory();

    const [playerName, setPlayerName] = useState('');

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setPlayerName(event.target.value);
    }
    function generateGame(): RegisteredGame {
        const obj = { gameId: '001', player1Name: playerName };

        return obj;
    }
    function apiCall(event: React.FormEvent<HTMLButtonElement>): void {
        event.preventDefault();

        // create a game Id, send the player name as well
        createRequest(generateGame())
            .then(res => res.text())
            .then(res => {
                if (res != '') {
                    console.log('Response from server', res, typeof res);
                    history.push(`/board/${res}/Awesome`);
                }
            });
    }

    return (
        <React.Fragment>
            <SubmitPlayer
                playerName={playerName}
                onChange={handleOnChange}
                onClick={apiCall}
                serverRes={serverResponse}
            />
        </React.Fragment>
    );
};

export { RegisterPlayer };
