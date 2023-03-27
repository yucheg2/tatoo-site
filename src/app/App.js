import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import TatoosProvider from "./hooks/useTatoo";
import StylesProvider from "./hooks/useStyles";
function App() {
    const getRoutes = () => {
        return routes.map((rout) => {
            return <Route key={rout.path} exact path={rout.path} component={rout.component} />;
        });
    };
    return (
        <BrowserRouter>
            <StylesProvider>
                <TatoosProvider>
                    <Switch>
                        {getRoutes()}
                    </Switch>
                </TatoosProvider>
            </StylesProvider>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
