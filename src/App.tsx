import React from 'react';
import './App.css';
import { RegisterPlayer } from './registerPlayer';
import Home from './Home';
import Board from './board';
import AddSecondPlayer from './addSecondPlayer';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
let count = 0;
function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/registerPlayer/:playerRegistration?/:gameId?" component={RegisterPlayer} />
                    <Route path="/" exact component={Home} />
                    <Route path="/addSecondPlayer" component={AddSecondPlayer} />
                    <Route path="/board/:playerName" component={() => <Board key={(count += 1)} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
