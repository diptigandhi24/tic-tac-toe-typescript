import React from 'react';
import './App.css';
import { RegisterPlayer } from './registerPlayer';
import Home from './Home';
import Board from './board';
import AddSecondPlayer from './addSecondPlayer';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/registerPlayer" component={RegisterPlayer} />
                    <Route path="/" exact component={Home} />
                    <Route path="/board" render={(name)=><AddSecondPlayer name={name}}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
