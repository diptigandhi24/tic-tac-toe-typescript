import React, { useState, useEffect } from 'react';
import {
    updatePlayerBoard,
    checkForWinnerOnEveryMove,
    updateRivalBoard,
    requestUpdateWincheckRivalMove,
} from '../Game/Network';
import BoardUI from './BoardUI';

interface OnClickChanges {
    setWinner: React.Dispatch<React.SetStateAction<string>>;
}

interface ParticipantsDetails {
    playerToken: string;
    playerIdentity: string;
    rivalPlayerIdentity: string;
    rivalToken: string;
}

interface BoardIndentityPlayerVerification {
    gameId: string;
    password: string;
}

interface BoardProps {
    participantsDetails: ParticipantsDetails;
    boardIndentityPlayerVerification: BoardIndentityPlayerVerification;
    onClickChanges: OnClickChanges;
}
const CreateBoard: React.FC<BoardProps> = (props: BoardProps) => {
    const { playerToken, playerIdentity, rivalToken } = props.participantsDetails;
    const { gameId, password } = props.boardIndentityPlayerVerification;
    const { setWinner } = props.onClickChanges;
    console.log('Created the board', playerIdentity, playerToken);
    const [boardState, updatePlayerMoves] = useState<Array<string>>(Array(16).fill(''));
    const [myTurn, setMyturn] = useState(playerIdentity === 'player2' ? true : false);
    useEffect(() => {
        setMyturn(preState => !preState);
    }, [boardState]);

    const handleSquareClick = (event: React.MouseEvent<HTMLElement>): void => {
        const id = event.currentTarget.id;
        const rowId = event.currentTarget.dataset.rowid || '';
        const colId = event.currentTarget.dataset.colid || '';

        //step1 - updatePlayerBoard

        updatePlayerBoard({ id, playerToken, updatePlayerMoves });

        //step2 - check for winner after every move

        checkForWinnerOnEveryMove({ rowId, colId, playerToken, setWinner });

        //step3 - Update Rival board
        updateRivalBoard({ event, gameId, playerIdentity, password }).then(updateSucceed => {
            console.log('Succeed Player1 Move', updateSucceed);
            if (updateSucceed != null) {
                //step4 - Request =>Update Rival Move => Check for the winner on board update => for the Rival Move
                console.log('Succeed Player1 Move', updateSucceed.success);
                if (updateSucceed.success === true) {
                    requestUpdateWincheckRivalMove({
                        playerIdentity,
                        gameId,
                        password,
                        rivalToken,
                        updatePlayerMoves,
                        setWinner,
                    });
                }
            }
        });
    };
    // if the boardIdentity is player2, request for the player 1 move
    if (playerIdentity === 'player2' && boardState.includes('o') === false) {
        console.log('Making the request for player 1 move');
        requestUpdateWincheckRivalMove({
            playerIdentity,
            gameId,
            password,
            rivalToken,
            updatePlayerMoves,
            setWinner,
        });
    }
    return (
        <React.Fragment>
            <h4>{myTurn === true ? 'make a move' : 'waiting for other player'}</h4>
            <BoardUI
                boardSize={Math.sqrt(boardState.length)}
                handleSquareClick={handleSquareClick}
                boardState={boardState}
                visibility={myTurn === true ? 'enabled' : 'disabled'}
            />
        </React.Fragment>
    );
};

export default CreateBoard;
