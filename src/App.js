import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginProvider } from "./contexts/LoginContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AppLayout from "./pages/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const App = () => {
  return (
    <Router>
      <LoginProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <ProtectedRoute path="/project" component={AppLayout} />
            <Redirect path="/" to="/project" />
          </Switch>
        </MuiPickersUtilsProvider>
      </LoginProvider>
    </Router> 
  );
};

export default App;
