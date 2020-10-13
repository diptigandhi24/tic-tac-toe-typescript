import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CreateBoard from '../BoardUI/CreateBoard';

const Game: React.FC<{}> = () => {
    const location = useLocation<{
        player1Name: string | undefined;
        player2Name: string | undefined;
        gameId: string;
        password: string;
        boardIdentity: string;
    }>();

    const [declareWinner, setWinner] = useState(' ');
    const playerIdentity = location.state.boardIdentity;
    const playerToken = playerIdentity === 'player1' ? 'X' : 'O';
    const rivalToken = playerToken === 'X' ? 'O' : 'X';
    const rivalPlayerIdentity = playerIdentity === 'player1' ? 'player2' : 'player1';

    return (
        <div>
            <h1>Lets begin the game</h1>
            <h4>Player1:{location.state.player1Name} </h4>
            <h4>Player2:{location.state.player2Name} </h4>
            {declareWinner === ' ' ? null : <h4>Winner is {declareWinner} </h4>}
            <CreateBoard
                participantsDetails={{ playerToken, playerIdentity, rivalPlayerIdentity, rivalToken }}
                boardIndentityPlayerVerification={{ gameId: location.state.gameId, password: location.state.password }}
                onClickChanges={{ setWinner }}
            />
        </div>
    );
};

export default Game;
