import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Main from './containers/Main';
import Register from './components/Register/Register';
import Integer from './containers/Integer';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Register} />
      <Route path="/login" component={Main} />
      <Route path="/account" component={Integer} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
