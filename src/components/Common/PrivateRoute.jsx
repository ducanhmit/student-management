import React from "react";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute(props) {
  // check if user is logged in

  // if yes, show route

  // oherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  if (!isLoggedIn) return <Redirect to="/login" />

  return <Route {...props} />;
}
