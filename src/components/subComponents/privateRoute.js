import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// get all props of <PrivateRoute/>
export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  // current value in the store //
  const user_details = useSelector((state) => state.userSigning);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (user_details.email) {
          return <RouteComponent {...routeProps} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};
