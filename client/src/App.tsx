import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";

const App: React.FC = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Switch>
        <Route path='/' exact strict>
          {token === null || undefined ? <Redirect to='auth' /> : <HomePage />}
        </Route>
        <Route path='/auth' component={AuthPage} />
      </Switch>
    </Router>
  );
};

export default App;
