import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import router from 'router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Tabs from './components/TabsView';
import Logo from './components/TracifiedLogo';
import ProductMapping from './components/ProductMappingModule/ProductMapping';
import TraceTimeLine from './components/TraceTimeLine';
import '@shopify/polaris/styles.css';
import AddItem from './components/AddItem';
import IndexItem from './components/IndexItem';
import EditItem from './components/EditItem';
import AccountVerify from './components/AccountVerify';

ReactDOM.render(
    <Router basename="/shopify" >
        <div>
            <Route path='/main-view' component={Logo} />
            <Route path='/main-view' component={Tabs} />
            <Route exact path='/add-item' component={AddItem} />
            <Route exact path='/index' component={IndexItem} />
            <Route exact path='/edit/:id' component={EditItem} />
            <Route exact path='/product-mapping' component={ProductMapping} />
            <Route exact path='/trace/:orderID/:itemID' component={TraceTimeLine} />
            <Route exact path='/account-verify' component={AccountVerify} />
            
        </div>
    </Router>,
    document.getElementById('root')

);



