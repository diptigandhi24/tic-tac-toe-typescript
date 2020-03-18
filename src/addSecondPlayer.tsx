import React from 'react';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';

const AddSecondPlayer: React.FC<{}> = () => {
    const location = useLocation<{
        player1Name: Location<{} | null | undefined>;
        playerId: Location<{} | null | undefined>;
    }>();
    console.log('Location', location.state);
    console.log('The compoenent received: ', location);
    return (
        <h1>
            Hello {location.state.player1Name} welcome to {location.state.playerId}
        </h1>
    );
};

export default AddSecondPlayer;
