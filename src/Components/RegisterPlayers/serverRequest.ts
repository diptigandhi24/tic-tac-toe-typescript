import { API_ROOT } from '../../constants';

//Server is hosted at Heroku at https://intense-refuge-70771.herokuapp.com:5000
export function registerPlayer(playerGameDetail: {}): Promise<Response> {
    return fetch(API_ROOT, {
        method: 'post',
        body: JSON.stringify(playerGameDetail),
        headers: { 'Content-Type': 'application/json' },
    });
}
interface Player1ServerRegistration {
    player1Details: {};
    playerRegistration: string;
}
interface Player1ServerInfo {
    gameId: string;
    boardIdentity: string;
    player1Name: string;
    password: string;
}
export async function playerRegistrationInfo(
    player1ServerRegistration: Player1ServerRegistration,
): Promise<Player1ServerInfo | void> {
    const { player1Details, playerRegistration } = player1ServerRegistration;

    try {
        const respond = await registerPlayer(player1Details);

        const res = await respond.text();

        if (res) {
            const resObj = await JSON.parse(res);

            const player1ServerInfo = {
                player1Name: resObj.playerInfo.name,
                password: resObj.playerInfo.password,
                boardIdentity: playerRegistration,
                gameId: resObj.gameId,
            };
            return player1ServerInfo;
        }
    } catch (error) {
        return alert(error);
    }
}
interface Player1Verification {
    gameId: string;
    boardIdentity: string;
    player1Name: string;
    password: string;
    player2Name: string;
}
export async function requestPlayer2Details(player1Verification: Player1Verification): Promise<Player1Verification> {
    try {
        const response = await fetch(`${API_ROOT}/requesting-player2-details`, {
            method: 'post',
            body: JSON.stringify(player1Verification),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.text();

        if (res) {
            const resObj = await JSON.parse(res);
            console.log('requesting result', resObj);
            if (resObj !== undefined && resObj.beginGame === true) {
                player1Verification.player2Name = resObj.playerInfo.player2Name;
            }
        }
    } catch (error) {
        alert(error);
    }
    return player1Verification;
}

interface Player2Details {
    playerName: string;
    gameId: string;
}
interface Player2GameInfo {
    playerInfo: {
        player1Name: string;
        player2Name: string;
        password: string;
    };
    gameId: string;
}
export function registerPlayer2(player2Details: Player2Details): Promise<Player2GameInfo> {
    return registerPlayer(player2Details)
        .then(res => res.text())
        .then(res => {
            const resObj = JSON.parse(res);
            return resObj;
        });
}
