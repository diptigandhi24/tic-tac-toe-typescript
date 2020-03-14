import React from 'react';

interface Props{
    playerName:string;
}
function playerDetails(props:Props){
    return <React.Fragment>
        <h4>Player1 : {props.playerName}</h4>
        <h2>Here is the link to invite player 2 :</h2>
    </React.Fragment>
}