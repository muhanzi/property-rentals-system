import React from "react";
import { Route, Redirect } from "react-router-dom";
import ApiUtils from "../../apiCalls/APIUtils";

// get all props of <PrivateRoute/>
export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const apiUtils = new ApiUtils();
  const results = apiUtils.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (results.status === 200) {
          return <RouteComponent {...routeProps} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};
