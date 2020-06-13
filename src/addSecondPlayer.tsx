import React from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Location } from 'history';

const AddSecondPlayer: React.FC<{}> = () => {
    const location = useLocation<{
        player1Name: Location<{}>;
        password: Location<{}>;
        boardIdentity: Location<{}>;
        gameId: Location<{}>;
    }>();
    //once the player is register all the request will be made with board identity,name, password
    const history = useHistory();

    function keepChecking(): void {
        const playerDetail = {
            gameId: location.state.gameId,
            boardIdentity: location.state.boardIdentity,
            player1Name: location.state.player1Name,
            password: location.state.password,
        };
        console.log('Requsting for the second player Name', playerDetail);
        function checkIfPlayerTwoRegister(): void {
            fetch(`http://localhost:5000/requestingPlayer2Details`, {
                method: 'post',
                body: JSON.stringify(playerDetail),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.text())
                .then(res => {
                    if (res !== undefined) {
                        console.log('Before Parsing resonse', res);
                        const resObj = JSON.parse(res);
                        console.log('Response to the request of for player detail', resObj);
                        if (resObj.beginGame == true) {
                            console.log(
                                'Yayy Player2 register',
                                resObj.player2Name,
                                resObj.gameId,
                                location.state.gameId,
                            );
                            clearInterval(untilPlayer2Registered);
                            const playerInfo = {
                                player1Name: resObj.playerInfo.player1Name,
                                player2Name: resObj.playerInfo.player2Name,
                                boardIdentity: playerDetail.boardIdentity,
                                gameId: resObj.gameId,
                                password: resObj.playerInfo.password,
                            };
                            history.push({ pathname: `/board/${playerInfo.boardIdentity}`, state: playerInfo });
                        } else {
                            console.log('wating for player2 to Register');
                        }
                    }
                });
        }
        const untilPlayer2Registered = setInterval(checkIfPlayerTwoRegister, 10000);
    }
    keepChecking();
    return (
        <React.Fragment>
            <h1>player1: {location.state.player1Name}</h1>
            <h1>Invite Player2 with the given link</h1>
            <p style={{ color: 'red' }}>
                <span>http://localhost:3000/registerPlayer/player2/{location.state.gameId}</span>
            </p>
        </React.Fragment>
    );
};

export default AddSecondPlayer;
