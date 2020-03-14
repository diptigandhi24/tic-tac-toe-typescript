import React ,{useState}from 'react';




export const RegisterPlayer = () =>{
    let [routerRes , setRouterRes]= useState("Before Router res")
    function apiCall(){
        console.log("api function call is run");
        fetch("http://localhost:5000")
            .then(res => res.text())
            .then(res => setRouterRes(res));
    }
    return <form>
        <label>Enter your name: <input type="string" value=""/></label>
        <button onClick={(event)=>{event.preventDefault();apiCall()}}>Register as player 1</button>
        <label>{routerRes}</label>
    </form>
    
}