import { Switch, Route, Router, Redirect } from 'react-router-dom';
import Dashboard from "../src/admins/Dashboard";
import HomePage from "../src/users/index";
import PrivateRouter from "../src/common/PrivateRouter";
import Login from "../src/common/Login";
import '../src/styles/App.scss';
import Checkout from "../src/users/Checkout";
import Account from './users/Account';
import RegisterAccount from './common/RegisterAccount';
import PrivateAdminRouter from './common/PrivateAdminRouter';
import SugguestProduct from './users/SugguestProduct';
import Footer from './common/Footer';
function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/colections" component={ HomePage } />
        <Route path="/login-user" component={ Login } />
        <Route path="/register" component={ RegisterAccount } />
        <Route path="/sugguest-product" component= { SugguestProduct } />
        <PrivateRouter path="/customer" >
          <Account />
        </PrivateRouter>
        <PrivateRouter path="/checkout/payment" > 
            <Checkout />
        </PrivateRouter>
        <PrivateAdminRouter path="/dashboard" >
          <Dashboard />
        </PrivateAdminRouter>
      </Switch>
      
      <Footer />
    </div>
  );
}
export default App;
