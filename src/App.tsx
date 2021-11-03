import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import './App.css';
import Header from './components/Header';
import ShoppingPage from './components/pages/ShoppingPage';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={['/']} component={HomePage} exact />
        <Route path="/shopping" component={ShoppingPage} />
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
