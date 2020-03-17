import React from 'react';
// import { InputField } from './inputElement';

/*
We need the function to hanle the onclick function
we need the function to handle the onchange function
*/
type EventProps = {
    playerName: string;
    serverRes: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
};
const SubmitPlayer: React.FC<EventProps> = (props: EventProps) => {
    return (
        <form>
            <input type="text" value={props.playerName} onChange={props.onChange} />
            <button name="submit" type="submit" value={props.playerName} onClick={props.onClick}>
                Register player
            </button>
            <label>{props.serverRes}</label>
        </form>
    );
};

export default SubmitPlayer;
