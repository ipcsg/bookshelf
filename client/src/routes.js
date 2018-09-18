import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout';
import BooksView from './components/Books';
import Login from './containers/Admin/login';
import Auth from './hoc/auth';
import User from './components/Admin';
import BookReview from './containers/Admin/add';
import UserPosts from './components/Admin/userPosts';
import EditReview from './containers/Admin/edit';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home,null)} />{/*Auth checks whether the user is logged in and token valid etc, before rendering each page. In this case Home component is checked*/}
                <Route path="/books/:id" exact component={Auth(BooksView)} />
                <Route path="/user" exact component={Auth(User,true)} />
                <Route path="/user/add" exact component={Auth(BookReview,true)} />
                <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true)} />
                <Route path="/login" exact component={Auth(Login,false)} />
                <Route path="/user/user-reviews" exact component={Auth(UserPosts,true)} />
            </Switch>
        </Layout>
    );
};

export default Routes;