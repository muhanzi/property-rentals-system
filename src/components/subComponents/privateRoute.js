import React from "react";
import { Route, Redirect } from "react-router-dom";
import ApiUtils from "../../apiCalls/APIUtils";

// get all props of <PrivateRoute/>
export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const apiUtils = new ApiUtils();
  const isUserActive = apiUtils.getCurrentUser().isUserActive; // returns an {"isUserActive":boolean,"user_data":{...}} true if there is a current user

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isUserActive) {
          return <RouteComponent {...routeProps} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};
