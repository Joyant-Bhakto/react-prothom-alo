import React from "react";
import Notfound from "@src/pages/NotFound";
import { Route, Switch } from "react-router-dom";

import DashboardPage from "@pages/DashboardPage"
import NewsDetailsPage from "@pages/NewsDetailsPage";

const HomeContainerView: React.FC = () => {
    return (
        <>
            <Switch>
                <Route exact path={"/news"}>
                    <DashboardPage />
                </Route>

                <Route exact path={"/news/:newsId/:newsCategory"}>
                    <NewsDetailsPage />
                </Route>

                <Route>
                    <Notfound />
                </Route>
            </Switch>
        </>
    );
};

export default HomeContainerView;
