import lookForWinner from '../../winnerDeclaration';
import { API_ROOT } from '../../constants';

interface MoveInfo {
    id: string;
    playerToken: string; //"x or O"
    updatePlayerMoves: React.Dispatch<React.SetStateAction<string[]>>;
}
export function updatePlayerBoard(moveInfo: MoveInfo): void {
    const { id, playerToken, updatePlayerMoves } = moveInfo;
    updatePlayerMoves((prevState: Array<string>) => {
        const updatedSquares: Array<string> = [...prevState];

        updatedSquares[parseInt(id)] = playerToken;

        return updatedSquares;
    });
}
interface WinCheckMove {
    rowId: string;
    colId: string;
    playerToken: string;
    setWinner: React.Dispatch<React.SetStateAction<string>>;
}
export function checkForWinnerOnEveryMove(winCheckMove: WinCheckMove): void {
    const { rowId, colId, playerToken, setWinner } = winCheckMove;
    const result = lookForWinner(rowId, colId, playerToken);
    if (result != 'Done') {
        setWinner(result);
    }
}
interface UpdatePlayerMove {
    success: boolean;
}
export async function updateRivalBoard(
    serverCommunicationInfo: ServerCommunicationInfo,
): Promise<UpdatePlayerMove | void> {
    const rowId = serverCommunicationInfo.event.currentTarget.dataset.rowid || '';
    const colId = serverCommunicationInfo.event.currentTarget.dataset.colid || '';
    const squareId = serverCommunicationInfo.event.currentTarget.id;
    const { gameId, playerIdentity, password } = serverCommunicationInfo;
    const playerMove = {
        gameId,
        playerIdentity,
        password,
        rowId,
        colId,
        squareId,
    };
    console.log('Sending Player Info to the server', playerMove);
    return await fetch(`${API_ROOT}/updateplayermove`, {
        method: 'post',
        body: JSON.stringify(playerMove),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.text())
        .then(res => {
            const resObj = JSON.parse(res);
            console.log('Respond receive from the server', resObj.success);
            return { success: resObj.success };
        })
        .catch(error => alert(`Updating Rival Move error ${error}`));
}

interface ServerCommunicationInfo {
    event: React.MouseEvent<HTMLElement>;
    gameId: string;
    playerIdentity: string;
    password: string;
}

interface PlayerVerificationInfo {
    gameId: string;
    playerIdentity: string;
    password: string;
}
interface UpdateBoard {
    id: string;
    rowId: string;
    colId: string;
    yourTurn: boolean;
}
export async function requestRivalMoveEveryOneSec(
    playerVerificationInfo: PlayerVerificationInfo,
): Promise<UpdateBoard | void> {
    const { playerIdentity, gameId, password } = playerVerificationInfo;
    return await fetch(`${API_ROOT}/getplayermove`, {
        method: 'post',
        body: JSON.stringify({ playerIdentity, gameId, password }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.text())
        .then(res => JSON.parse(res))
        .then(resObj => {
            if (resObj.yourTurn === true) {
                console.log('Success');
                const tempObj = { id: resObj.id, rowId: resObj.rowId, colId: resObj.colId, yourTurn: resObj.yourTurn };
                return tempObj;
            } else {
                const tempObj = { id: '', rowId: '', colId: '', yourTurn: false };
                return tempObj;
            }
        })
        .catch(error => alert('Server Error' + error));
}
interface RequestUpdateRivalMove {
    playerIdentity: string;
    gameId: string;
    password: string;
    rivalToken: string;
    updatePlayerMoves: React.Dispatch<React.SetStateAction<string[]>>;
    setWinner: React.Dispatch<React.SetStateAction<string>>;
}

export function requestUpdateWincheckRivalMove(requestUpdateRivalMove: RequestUpdateRivalMove): void {
    const { playerIdentity, gameId, password, rivalToken, updatePlayerMoves, setWinner } = requestUpdateRivalMove;
    console.log('Hello I am player2');
    let timeOutId = 0;
    timeOutId = window.setInterval(() => {
        requestRivalMoveEveryOneSec({ playerIdentity, gameId, password }).then(response => {
            if (response != null) {
                if (response.yourTurn) {
                    const id = response.id;
                    const rowId = response.rowId;
                    const colId = response.colId;
                    const playerToken = rivalToken;
                    clearTimeout(timeOutId);
                    updatePlayerBoard({ id, playerToken, updatePlayerMoves });
                    checkForWinnerOnEveryMove({ rowId, colId, playerToken, setWinner });
                }
            }
        });
    }, 2000);
}
