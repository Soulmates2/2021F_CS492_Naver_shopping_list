import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ShoppingPage from './components/pages/ShoppingPage';
import ChartPage from './components/pages/ChartPage';
import NaverIdLogin from './components/pages/LoginPage';
import NaverIdLoginCallback from './components/pages/LoginCallback';
import { useLocation } from 'react-router-dom';

function App() {
  const path = useLocation().pathname;

  return (
    <>
      <Header />
      {path === '/' ? <Redirect to="/home" /> : <></>}
      <Switch>
        <Route path="/loginSuccess" component={NaverIdLoginCallback} />
        <Route path={['/', '/home']} component={NaverIdLogin} exact />
        <Route path="/channels/:channelID" component={ShoppingPage} />
        <Route path="/products/:productID" component={ChartPage} />
      </Switch>
    </>
  );
}

export default App;
