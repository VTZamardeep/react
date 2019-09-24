import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Login from "./containers/Login/Login";
import Quiz from "./containers/Quiz/Quiz";

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/quiz" component={Quiz}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
