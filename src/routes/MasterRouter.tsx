import React from "react";
import HomeContainerView from "@containers/HomeContainerView";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

const MasterRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Redirect to={"/news"} from={"/"} exact />

        <Route path={"/"}>
          <HomeContainerView />
        </Route>
      </Switch>
    </Router>
  );
};

export default MasterRouter;
