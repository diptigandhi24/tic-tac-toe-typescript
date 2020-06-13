"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var registerPlayer_1 = require("./registerPlayer");
var Home_1 = require("./Home");
var board_1 = require("./board");
var addSecondPlayer_1 = require("./addSecondPlayer");
var react_router_dom_1 = require("react-router-dom");
var count = 0;
function App() {
    return (<react_router_dom_1.BrowserRouter>
            <div className="App">
                <react_router_dom_1.Switch>
                    <react_router_dom_1.Route path="/registerPlayer/:playerRegistration?/:gameId?" component={registerPlayer_1.RegisterPlayer}/>
                    <react_router_dom_1.Route path="/" exact component={Home_1["default"]}/>
                    <react_router_dom_1.Route path="/addSecondPlayer" component={addSecondPlayer_1["default"]}/>
                    <react_router_dom_1.Route path="/board/:playerName" component={function () { return <board_1["default"] key={(count += 1)}/>; }}/>
                </react_router_dom_1.Switch>
            </div>
        </react_router_dom_1.BrowserRouter>);
}
exports["default"] = App;
