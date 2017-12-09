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




class ProductMapping extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '', shopifyProducts: [], tracedata: [], productName: '', tracifiedItemID: '', tracifiedItemtitle: '', permisison: '' };
    this.productMappingService = new ProductMappingService();
  }

  componentDidMount() {

    axios.get('/shopify/shop-api/products')
      .then(response => {
        console.log(response);
        console.log(response.data);

        var products = response.data.products;
    
        products = products.reduce(function (reducedJson, product) {
          reducedJson.push({
            id: product.id,
            title: product.title

          });
          return reducedJson;
        },[]);
        console.log("reduced products");
        console.log(products);
        this.setState({ shopifyProducts: products });
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
        this.setState({ tracedata: response_.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  tabRow() {
    const trace = this.state.tracedata;
    if (this.state.shopifyProducts instanceof Array) {
      return this.state.shopifyProducts.map(function (object, i) {
        return <ProductMappingTableRow obj={object} key={i} tracelist={trace} />;

      })

    }
  }

  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }


  onSubmit = (e) => {
    console.log('console');
    e.preventDefault();
    // get our form data out of state
    const { productName, tracifiedItemID, tracifiedItemtitle, permisison } = this.state;
    axios.post('https://tracified-mock-api.herokuapp.com/test/post', { productName, tracifiedItemID, tracifiedItemtitle, permisison })
      .then((result) => {
        //access the results here....
        console.log(result);
      });

  }



  render() {



    const { productName, tracifiedItemID, tracifiedItemtitle, permisison } = this.state;



    return (
      <div class="loader" id="productmapping">

        <div className="container">

          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.js"></script>


          
              <Card title="Product Mapping Details">
                <form>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                    <td value="productName" onChange={this.onChange}>Product Name</td>
                        <td value="tracifiedItemID" onChange={this.onChange}>Tracified Item ID</td>
                        <td value="tracifiedItemtitle" onChange={this.onChange}>Tracified Item title</td>
                        <td value="permisison" onChange={this.onChange}>Permission</td>
                      </tr>
                    </thead>
                    <tbody>

                      {this.tabRow()}

                    </tbody>
                    <tfoot>
                   
                      <Button onClick={this.onSubmit}>Add product</Button>

                    </tfoot>
                    
                  </table>
                  
                </form>
              </Card>
        </div>
      </div>

    );

    <ProductMappingTableRow /> ,
      document.getElementById('productmapping')

  }
}

export default ProductMapping;