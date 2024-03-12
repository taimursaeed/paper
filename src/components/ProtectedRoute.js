import React from "react";
import { Route } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const ProtectedRoute = ({ children, path }) => {
  const auth = getAuth();

  return (
    <>
      {auth.currentUser ? (
        <Route path={path}>{children}</Route>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
export default ProtectedRoute;
