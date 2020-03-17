import RegisteredGame from './RegisteredGame';

function createRequest(game: RegisteredGame): Promise<Response> {
    console.log('game obj is', game, JSON.stringify(game));
    return fetch('http://localhost:5000', {
        method: 'post',
        //send the data here
        body: JSON.stringify(game),
        headers: { 'Content-Type': 'application/json' },
    });
}

export default createRequest;
