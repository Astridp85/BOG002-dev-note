import './inicio.css';
import './home.css';
import React from 'react';
import { Login } from './components/LoginForm';
import { SignUp } from './components/Signup';
import { Home } from './components/Home';


import { AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

