import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board';
import {RegisterPlayer} from './registerPlayer';
import Home from './Home'
import { Route,Link , BrowserRouter as Router, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">

      
      <Switch>
      <Route path="/registerPlayer" component={RegisterPlayer}/>
      <Route path="/" component={Home}/>
      </Switch>
      </div>
    </Router>
    
  );
}

export default App;
