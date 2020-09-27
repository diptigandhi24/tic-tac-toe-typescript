import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <React.Fragment>
            <h1>Welcome to Tic-tac-toe Remote playing game</h1>
            <Link to="/register-player1/player1">
                <button>Initiate the game</button>
            </Link>
        </React.Fragment>
    );
}
