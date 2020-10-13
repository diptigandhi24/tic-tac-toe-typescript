import React, { useState } from 'react';
import RegistrationForm from './registerationForm';

import createGameUUID from '../../createGameId';
import { useHistory, useParams } from 'react-router-dom';
import { playerRegistrationInfo } from './serverRequest';
interface ParamTypes {
    gameId: string;
    playerRegistration: string;
}
export const PlayerSecretInfo = React.createContext({
    player1Name: '',
    password: '',
    boardIdentity: '',
    gameId: '',
});
function RegisterPlayer1(): JSX.Element {
    const { playerRegistration } = useParams<ParamTypes>();
    const [playerName, updatePlayerName] = useState('');
    const history = useHistory();
    // const socketConnection = (): void => {
    //     const socket = new WebSocket('ws://localhost:8080');

    //     socket.onopen = function(e): void {
    //         console.log(e);
    //         alert('[open] Connection established');
    //         alert('Sending to server');
    //         socket.send('My name is Dipti');
    //     };

    //     socket.onmessage = function(event): void {
    //         alert(`[message] Data received from server: ${event.data}`);
    //     };

    //     socket.onclose = function(event): void {
    //         if (event.wasClean) {
    //             alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    //         } else {
    //             // e.g. server process killed or network down
    //             // event.code is usually 1006 in this case
    //             alert('[close] Connection died');
    //         }
    //     };

    //     socket.onerror = function(error): void {
    //         alert(`[error] ${error}`);
    //     };
    // };

    // useEffect(() => {
    //     socketConnection();
    // }, []);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
        updatePlayerName(event.target.value);
    }

    function submitPlayer1Details(event: React.FormEvent<HTMLButtonElement>): void {
        event.preventDefault();
        const player1Details = {
            playerName: event.currentTarget.value,
            gameId: createGameUUID(),
        };

        playerRegistrationInfo({ player1Details, playerRegistration }).then(player1verification => {
            history.push({ pathname: `/add-second-player`, state: { ...player1verification } });
        });
    }

    return <RegistrationForm onChange={handleOnChange} onClick={submitPlayer1Details} value={playerName} />;
}

export default RegisterPlayer1;
