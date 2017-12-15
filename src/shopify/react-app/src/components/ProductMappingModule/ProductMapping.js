// ProductMapping.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductMappingService from './ProductMappingService';
import axios from 'axios';
import ProductMappingTableRow from './ProductMappingTableRow';
import {
  Layout,
  Page,
  FooterHelp,
  Card,
  Link,
  Button,
  FormLayout,
  TextField,
  AccountConnection,
  ChoiceList,
  SettingToggle,
  Stack,
  Badge,
  Heading,
  PageActions,
  Select,
  Checkbox
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import './AppMP.css'
import { setTimeout } from 'timers';
import Spinner from '../../lib/components/Spinner';
import { request } from 'http';



class ProductMapping extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, value: '', shopifyProducts: [], tracedata: [], productName: '', tracifiedItemID: '', productItemID: '', permisison: '', mapping: ''
    };
    this.productMappingService = new ProductMappingService();
    this.onSubmit = this.onSubmit.bind(this);

  }


  componentDidMount() {

    if (request.status == 200) {
      this.state.isLoading = false;

    }


    axios.get('/shopify/shop-api/products')
      .then(response => {
        console.log(response);
        console.log(response.data);

        if (response.status == 200) {
          this.state.isLoading = false;

        }


        var products = response.data.products;

        products = products.reduce(function (reducedJson, product) {
          reducedJson.push({
            id: product.id,
            title: product.title

          });
          return reducedJson;
        }, []);
        console.log("reduced products");
        console.log(products);
        this.setState({ shopifyProducts: products });
        console.log(this.state.shopifyProducts);
      })
      .catch(function (error) {
        console.log(error);
      });


    axios({
      method: 'get',
      url: '/shopify/tracified/item-list',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
      .then(response_ => {
        console.log(response_.data);
        this.setState({ tracedata: response_.data });


        if (response_.status == 200) {
          this.state.isLoading = false;

        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  tabRow() {
    const trace = this.state.tracedata;
    console.log(this.state.tracedata);
    if (this.state.shopifyProducts instanceof Array) {
      return this.state.shopifyProducts.map(function (object, i) {
        return <ProductMappingTableRow obj={object} key={i} tracelist={trace} />;

      })

    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(e.target.vaue);
  }


  onSubmit = (e) => {
    console.log('console');
    e.preventDefault();
    // get our form data out of state
    const { productName, tracifiedItemID, tracifiedItemtitle, permisison } = this.state;

    
    /**
     * write functions to adjust dynamically a state attribute that holds the current selections by the user.
     * then assign that attribute to the following "mapping:" instead of "{productName, tracifiedItemID, tracifiedItemtitle, permisison }"
     * means it should look like " mapping: this.state.mapping"
     * make sure that state.mapping holds the current selections
     */
    axios.post('/shopify/config/mapping', { mapping: { productName, tracifiedItemID, tracifiedItemtitle, permisison } })
      .then((result) => {
        //access the results here....
        console.log(result);
      });

  }



  render() {
    console.log('render starts');
    console.log(this.state.shopifyProducts.length);
    console.log(this.state.shopifyProducts);

    const { productName, tracifiedItemID, tracifiedItemtitle, permisison, isLoading } = this.state;
    console.log(this.state.productName);
    console.log('arrays are not null');



    console.log(isLoading);

    if (isLoading) {
      return <Spinner />;
      console.log('spinner');
    } else
      console.log('not spinner');


    return (
      <div class="loader" id="productmapping">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.js"></script>

        <Card title="Product Mapping Details">
          <br />
          <form>
            <table className="table table-striped">
              <thead>
                <tr>
                  <td  value="productName" >Product Name</td>
                  <td value="productItemID" onChange={this.onChange}>Product Item ID</td>
                  <td  value="tracifiedItemID" onChange={this.onChange}>Tracified Item ID</td>
                  <td value="permisison" onChange={this.onChange}>Permission</td>
                </tr>
              </thead>
              <tbody>

                {this.tabRow()}

              </tbody>
              <tfoot>
                <Button className="button" onClick={this.onSubmit}>Save</Button>
              </tfoot>
            </table>
          </form>
        </Card>
      </div>
    );
    <ProductMapping /> , document.getElementById('productmapping');
  }
}

export default ProductMapping;
