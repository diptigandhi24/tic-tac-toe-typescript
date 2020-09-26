// import RegisteredGame from './RegisteredGame';
import { API_ROOT } from './constants';
//https://intense-refuge-70771.herokuapp.com:5000
function createRequest(game: {}): Promise<Response> {
    // console.log('game obj is', game, JSON.stringify(game));
    return fetch(API_ROOT, {
        method: 'post',
        //send the data here
        body: JSON.stringify(game),
        headers: { 'Content-Type': 'application/json' },
    });
}

export default createRequest;
