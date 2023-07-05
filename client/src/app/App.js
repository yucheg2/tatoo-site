import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import MainPageLayout from "./layouts/mainPageLayout";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protecktedRoute";

function App() {
    const getRoutes = () => {
        return routes.map((rout) => {
            if (rout.protected) {
                return <ProtectedRoute key={rout.path} exact path={rout.path} component={rout.component}/>;
            }
            return <Route key={rout.path} exact path={rout.path} component={rout.component} />;
        });
    };
    return (
        <BrowserRouter>
            <MainPageLayout>
                <Switch>
                    {getRoutes()}
                    <Redirect to="/"/>
                </Switch>
            </MainPageLayout>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
