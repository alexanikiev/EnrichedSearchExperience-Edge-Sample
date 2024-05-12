import React, { Component } from "react";
import './App.css';

import * as Constants from "./Constants";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from "./Header";

import Home from './pages/home/Home';
import Documents from './pages/documents/Documents';
import DocSearchResults from './pages/docsearch/DocSearchResults';
import GraphSearchResults from './pages/graphsearch/GraphSearchResults';
import TextSearchResults from './pages/textsearch/TextSearchResults';
import Entities from './pages/entities/Entities';
import Topics from './pages/topics/Topics';
import Insights from './pages/insights/Insights';
import Hierarchies from './pages/hierarchies/Hierarchies';
import Settings from './pages/settings/Settings';
import Help from './pages/help/Help';
import Login from './pages/login/Login';

import 'semantic-ui-css/semantic.min.css';

interface IAppProps {
}

interface IAppState {
}

class App extends Component<IAppProps, IAppState> {

  render() {
    return (
      <BrowserRouter>
        <Container>
            <Header />
            <Switch>
              <Route exact path={Constants.HOME_ROUTE} component={Home} />
              <Route path={Constants.DOCUMENTS_ROUTE} component={Documents} />
              <Route path={Constants.DOCSEARCH_ROUTE} component={DocSearchResults} />
              <Route path={Constants.GRAPHSEARCH_ROUTE} component={GraphSearchResults} />
              <Route path={Constants.TEXTSEARCH_ROUTE} component={TextSearchResults} />
              <Route path={Constants.ENTITIES_ROUTE} component={Entities} />
              <Route path={Constants.TOPICS_ROUTE} component={Topics} />
              <Route path={Constants.INSIGHTS_ROUTE} component={Insights} />
              <Route path={Constants.HIERARCHIES_ROUTE} component={Hierarchies} />
              <Route path={Constants.SETTINGS_ROUTE} component={Settings} />
              <Route path={Constants.HELP_ROUTE} component={Help} />
              <Route path={Constants.LOGIN_ROUTE} component={Login} />
            </Switch>
          </Container>
      </BrowserRouter>
    );
  }
}

export default App;

/*
import logo from './logo.svg';

<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.tsx</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
*/
