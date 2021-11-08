import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import ShoppingPage from './components/pages/ShoppingPage';
import ChartPage from './components/pages/ChartPage';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={['/']} component={HomePage} exact />
        <Route path="/:channelID" component={ShoppingPage} />
        <Route path="/chart" component={ChartPage} />
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
