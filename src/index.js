import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './Cadastro/Register';
import { Route, Link, Router } from 'wouter';
import Login from './Login/Login';
import ProblemasESolucoes from './ProblemaSolução/ProblemasESolucoes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <Route path="/" component={ProblemasESolucoes} />
        <Route path="/Register" component={Register} />

      </Router>
  </React.StrictMode>
);
