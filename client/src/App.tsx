import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import './App.css';
import Header from './components/Header';
import ShoppingPage from './components/pages/ShoppingPage';
import ChartPage from './components/pages/ChartPage';
import NaverIdLogin from './components/pages/LoginPage';
import NaverIdLoginCallback from './components/pages/LoginCallback';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={NaverIdLogin} exact />
        <Route path="/loginSuccess" component={NaverIdLoginCallback} />
        <Route path="/home" component={HomePage} />
        <Route path="/channels/:channelID" component={ShoppingPage} />
        <Route path="/products/:productID" component={ChartPage} />
        <Route
          render={() => {
            return (
              <div>
                <h1>없는 페이지</h1>
              </div>
            );
          }}
        />
      </Switch>
    </>
  );
}

export default App;
