import React from 'react';
import { Route,Link , BrowserRouter as Router, Switch } from 'react-router-dom';

export default function Home(){

return<React.Fragment>
    <h1>Welcome to Tic-tac-toe Remote playing game</h1>
      <Link to="/registerPlayer"><button>Initiate the game</button></Link>
      </React.Fragment>
}