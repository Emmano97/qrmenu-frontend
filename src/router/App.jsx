import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Places from '../pages/Places';
import Place from '../pages/Place';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoutes';


function App(){
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/places" exact>
                        <Places />
                    </PrivateRoute>
                    <PrivateRoute path="/places/:id" exact>
                        <Place />
                    </PrivateRoute>
                </Switch>
            </Router>
            <ToastContainer />
        </AuthProvider>
    )
}

export default App;