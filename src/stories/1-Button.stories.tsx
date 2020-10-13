import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';
import Board from './boardtest';
import createBoard from '../Components/BoardUI/CreateBoard';

export const ButtonStory = () => {
    const [player, nextPlayer] = useState<Array<string>>(Array(16).fill(''));
    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        console.log('ID', event.currentTarget.id);
        nextPlayer(prevState => {
            const updateBoard: Array<string> = [...prevState];
            updateBoard[parseInt(event.currentTarget.id)] = 'x';
            return updateBoard;
        });
    };
    return (
        <ul>
            <li>Hello</li>
        </ul>
    );
};
export default {
    title: 'Button',
    component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const Emoji = () => (
    <Button onClick={action('clicked')}>
        <span role="img" aria-label="so cool">
            😀 😎 👍 💯
        </span>
    </Button>
);

export const BoardText = () => <Board />;
