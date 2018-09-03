import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout';
import BooksView from './components/Books';
import Login from './containers/Admin/login';
import Auth from './hoc/auth';
const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home)} />{/*Auth checks whether the user is logged in and token valid etc, before rendering each page. In this case Home component is checked*/}
                <Route path="/books/:id" exact component={BooksView} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Layout>
    );
};

export default Routes;