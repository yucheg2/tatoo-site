import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage";
import React from "react";
import Styles from "./layouts/stylesLayout";
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} component={MainPage} />
                <Route path="/styles/:style?" component={Styles} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
