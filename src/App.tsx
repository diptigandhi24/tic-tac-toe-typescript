import React from 'react';
import './App.css';
import { RegisterPlayer } from './registerPlayer';
import Home from './Home';
import Board from './board';
import AddSecondPlayer from './addSecondPlayer';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import RegisterPlayer1 from './Components/RegisterPlayers/registerPlayer1';
import RegisterPlayer2 from './Components/RegisterPlayers/registerPlayer2';
let count = 0;
function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    {/* <Route path="/register-player/:playerRegistration?/:gameId?" component={RegisterPlayer} /> */}
                    <Route path="/register-player1/:playerRegistration?/:gameId?" component={RegisterPlayer1} />
                    <Route path="/register-player2/:playerRegistration?/:gameId?" component={RegisterPlayer2} />
                    <Route path="/" exact component={Home} />
                    <Route path="/add-second-player" component={AddSecondPlayer} />
                    <Route path="/board/" component={() => <Board key={(count += 1)} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
