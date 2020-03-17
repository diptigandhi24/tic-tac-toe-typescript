import React from 'react';

//text button checkbox
type InputProps = {
    type: string;
    value: string;
    onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// type baseinput = {
//     type: 'string';
//     value: 'string';
// };

// type clickable = {
//     onClick: () => void;
// };

// type changeable = {
//     onChange: () => void;
// };

// type composedInput = baseinput & clickable & changeable;

const InputField: React.FC<InputProps> = (props: InputProps) => {
    console.log('our current props are');
    return <input type={props.type} value={props.value} />;
};

export { InputField };
