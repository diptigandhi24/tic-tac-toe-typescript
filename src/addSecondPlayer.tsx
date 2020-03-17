import React from 'react';

type PlayersDetail = {
    name: string;
};
const AddSecondPlayer: React.FC<PlayersDetail> = (props: PlayersDetail) => {
    return <h1>Hello {props.name} you are player 1</h1>;
};

export default AddSecondPlayer;
