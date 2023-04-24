import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import TatoosProvider from "./hooks/useTatoo";
import StylesProvider from "./hooks/useStyles";
import MainPageLayout from "./layouts/mainPageLayout";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./hooks/useAuth";
import MastersProvider from "./hooks/useMasters";

function App() {
    const getRoutes = () => {
        return routes.map((rout) => {
            return <Route key={rout.path} exact path={rout.path} component={rout.component} />;
        });
    };
    return (
        <BrowserRouter>
            <AuthProvider>
                <MastersProvider>
                    <StylesProvider>
                        <TatoosProvider>
                            <MainPageLayout>
                                <Switch>
                                    {getRoutes()}
                                </Switch>
                            </MainPageLayout>
                        </TatoosProvider>
                    </StylesProvider>
                </MastersProvider>
            </AuthProvider>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
