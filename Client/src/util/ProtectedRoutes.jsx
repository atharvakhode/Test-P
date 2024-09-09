import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ".././App.css";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const state = useSelector((state) => state);
  const isLogged = state.loggedin.IsLoggedIn;
  console.log("LoggedIn ", state.loggedin.IsLoggedIn)

  return (
    <Route
      {...rest}
      component={(props) =>
        isLogged ? (
          <div className="main-container">
            <Component  {...props} path={path}/>
          </div>
        ) : (
          <Redirect to="/clogin" />
        )
      }
    />
  );
};

export default ProtectedRoute;
