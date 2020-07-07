import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import HomePage from "../homePage";
import LandingPage from "../landingPage";
import WrongUrl from "./wrongUrl";
import Navigation from "./NavigationBar";
import Footer from "./footer";
import { PrivateRoute } from "./privateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navigation style={{ position: "fixed" }} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* protected route // to access home page user must be logged in */}
        <PrivateRoute exact path="/home" component={HomePage} />
        <Route component={WrongUrl} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
