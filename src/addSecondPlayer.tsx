import React from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';

interface RouteParams {
    name: string;
    age: string;
}

const AddSecondPlayer: React.FC<{}> = () => {
    const params = useParams<RouteParams>();
    console.log('The compoenent received: ', params);
    return (
        <h1>
            Hello {params.name} you are player 1 {params.age}
        </h1>
    );
};

export default AddSecondPlayer;
