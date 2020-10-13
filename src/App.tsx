import React from 'react';
import './App.css';
import Home from './Home';
import Game from './Components/Game/Game';
import AddSecondPlayer from './Components/RegisterPlayers/AddSecondPlayer';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import RegisterPlayer1 from './Components/RegisterPlayers/registerPlayer1';
import RegisterPlayer2 from './Components/RegisterPlayers/registerPlayer2';

function App(): JSX.Element {
    return (
        <Router>
            <div className="App">
                <Switch>
                    {/* <Route path="/register-player/:playerRegistration?/:gameId?" component={RegisterPlayer} /> */}
                    <Route path="/register-player1/:playerRegistration?/:gameId?" component={RegisterPlayer1} />
                    <Route path="/register-player2/:playerRegistration?/:gameId?" component={RegisterPlayer2} />
                    <Route path="/" exact component={Home} />
                    <Route path="/add-second-player" component={AddSecondPlayer} />
                    <Route path="/board/" component={Game} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
