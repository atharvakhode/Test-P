import React from 'react';
import './App.css';
import RegSupplier from './components/RegSupplier';
import NavBar from './components/NavBar';
import RegCustomer from './components/RegCustomer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';
import AllCustomers from './components/AllCustomers';
import AllSellers from './components/AllSellers';
import SellerLogin from './components/SellerLogin';
import CustomerLogin from './components/CustomerLogin';
import SellerProfile from './components/SellerProfile';
import AddProduct from './components/AddProduct';
import MyProducts from './components/MyProducts';
import AllProduct from './components/AllProducts';
import EditProduct from './components/EditProduct';
import CustomerProfile from './components/CustomerProfile';
import MyOrders from './components/MyOrders';
import Orders from './components/Orders';
import ViewCart from './components/ViewCart';
import ForgotPassword from './components/ForgotPassword';
import Footer from "./components/Footer.jsx";
import Address from './components/Address';
import Configuration from './components/Configuration.jsx';
import ProtectedRoute from './util/ProtectedRoutes.jsx';
import Billing from './components/Billing.jsx';
import PaymentFailure from './components/PaymentFailure.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import AddressPage from './components/AddressPage.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="justify-content-around">
          <NavBar />
        </div>

        <div className="content min_height">
          <Switch>
            <Route component={RegCustomer} path="/register" />
            <Route component={CustomerLogin} path="/clogin" />
            <Route component={ForgotPassword} path="/forgotPassword" />
            <Route component={ResetPassword} path="/resetPassword" />
            <Route component={CustomerLogin} path="/" exact />
            <ProtectedRoute component={AllProduct} path="/product" />
            <ProtectedRoute component={AllProduct} path="/cat/:pcat/:subcat" />
            <ProtectedRoute component={CustomerProfile} path="/cprofile" />
            <ProtectedRoute component={MyProducts} path="/myproducts" />
            <ProtectedRoute component={MyOrders} path="/myorders" />
            <ProtectedRoute component={Billing} path="/billing" />
            <ProtectedRoute component={Orders} path="/orders" />
            <ProtectedRoute component={ViewCart} path="/cart" />
            <ProtectedRoute component={Address} path="/address" />
            <ProtectedRoute component={AddressPage} path="/addressPage" />
            <ProtectedRoute component={Configuration} path="/configuration" />
            <ProtectedRoute component={PaymentSuccess} path="/PaymentSuccess" />
            <ProtectedRoute component={PaymentFailure} path="/PaymentFailure" />
            {/* <ProtectedRoute component={AdminLogin} path="/alogin" /> */}
            {/* <ProtectedRoute component={AdminProfile} path="/aprofile" /> */}
            {/* <ProtectedRoute component={AllCustomers} path="/customers" /> */}
            {/* <ProtectedRoute component={AddProduct} path="/add-product" /> */}
            {/* <ProtectedRoute component={EditProduct} path="/edit/:prodid" /> */}
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
