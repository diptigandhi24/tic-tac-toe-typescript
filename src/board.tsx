//create board of 3 x 3 which can later be converted to n x n
import React,{useState} from 'react';
import Square from './square';
import './board.css'

//return x to the event.target
function displayValue(x:string){
    return x;
}

function Board(){
    const [player , nextPlayer] = useState<Array<string>>(Array(9).fill(""));
    //we need to keep the state of current player which we cannot keep it with normal variable
    const [playerCharacter, setCharacter]= useState("x");
    
    let handleClick=(id:number)=> {
        let updateBoard = [];
        updateBoard = [...player];
        setCharacter( prevState => prevState != "x"? "x" : "o");
        console.log("Before board Value",updateBoard[id]);
        updateBoard[id]=playerCharacter;
        console.log("After board Value",updateBoard[id]);
        nextPlayer([...updateBoard]);
        
        
        }
    
    return <div onClick={(e:any)=>handleClick(e.target.id)}>
        <Square value ={player[0]} id="0" />
        <Square value ={player[1]} id="1"/>
        <Square value ={player[2]} id="2"/>
        <Square value ={player[3]} id="3"/>
        <Square value ={player[4]} id="4"/>
        
        
    </div>
    

}
export default Board;