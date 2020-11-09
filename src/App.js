import { Switch, Route, Router, Redirect } from 'react-router-dom';
import Dashboard from "../src/admins/Dashboard";
import HomePage from "../src/users/index";
import PrivateRouter from "../src/common/PrivateRouter";
import Login from "../src/common/Login";
import '../src/styles/App.scss';
import { useEffect } from "react";

function App() {

  useEffect(() => {
    localStorage.setItem("lng","en");
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/login-user" component={ Login } />
        <PrivateRouter path="/dashboard" > 
            <Dashboard />
        </PrivateRouter>
      </Switch>
    </div>
  );
}
export default App;
