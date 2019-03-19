import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
        if (rest.loggedIn) {
          return <Component {...rest} />;
        } else {
          return (
            <Redirect to={{
                pathname: "/users/login",
                state: {
                from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
