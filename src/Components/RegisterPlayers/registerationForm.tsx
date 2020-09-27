import React from 'react';

type EventProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
};
const RegistrationForm: React.FC<EventProps> = (props: EventProps) => {
    return (
        <form>
            <input type="text" value={props.value} onChange={props.onChange} />
            <button name="submit" type="submit" value={props.value} onClick={props.onClick}>
                Register player
            </button>
        </form>
    );
};

export default RegistrationForm;
