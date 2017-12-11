import React , {Component} from 'react';
import ReactDOM from 'react-dom';

import router from 'router';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import AddItem from './components/AddItem';
import IndexItem from './components/IndexItem';
import EditItem from './components/EditItem';

import ProductMapping from './components/ProductMappingModule/ProductMapping';

ReactDOM.render(
    <Router basename="/shopify" >
        <div>
            <Route exact path='/' component={App}/>
            <Route exact path='/add-item' component={AddItem} />
            <Route exact path='/index' component={IndexItem}/>
            <Route exact path='/edit/:id' component={EditItem} />
            <Route exact path='/product-mapping' component={ProductMapping} />
        </div>
    </Router>,
    document.getElementById('root')
  
);



