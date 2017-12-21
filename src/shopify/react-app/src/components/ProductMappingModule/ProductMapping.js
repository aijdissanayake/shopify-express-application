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
import { Row, Col } from 'reactstrap';



class ProductMapping extends Component {

  constructor(props) {
    super(props);
    this.state = {
      permissionObject: '',
      isTraceListLoading: true,
      isProductListLoading: true,
      value: '',
      shopifyProducts: [],
      tracedata: [],
      productName: '',
      tracifiedItemID: '',
      tracifiedItemtitle: '',
      permission: {},
      mapping: {}
    };

    this.productMappingService = new ProductMappingService();
    this.updateMapping = this.updateMapping.bind(this);
    this.updatePermission = this.updatePermission.bind(this);

  }

  updatePermission(permission, shopifyProductID) {
    this.state.permission[shopifyProductID] = permission;
    if (this.state.permission.hasOwnProperty(shopifyProductID)) {
      this.state.mapping[shopifyProductID][1] = permission;
    }

    console.log(this.state.permission);
  }
  updateMapping(tracifiedItemID, shopifyProductID) {
    console.log(shopifyProductID);
    if (this.state.permission.hasOwnProperty(shopifyProductID)) {
      this.state.mapping[shopifyProductID] = [tracifiedItemID, true];
    }
    else {
      this.state.mapping[shopifyProductID] = [tracifiedItemID, false];
    }

    console.log(this.state.mapping);

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
        }, []);
        console.log(products);
        this.setState({ shopifyProducts: products });
        console.log(this.state.shopifyProducts);

        if (response.status == 200) {
          this.setState({ isProductListLoading: false });


        }

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
          this.setState({ isTraceListLoading: false });

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
      return this.state.shopifyProducts.map((object, i) => {
        return <ProductMappingTableRow
          updateMapping={this.updateMapping}
          updatePermission={this.updatePermission}
          obj={object}
          key={i}
          tracelist={trace}
        />;

      })

    }
  }

  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }


  onSubmit = (e) => {
    console.log('console');
    e.preventDefault();
    // get our form data out of state
    const { productName, tracifiedItemID, tracifiedItemtitle, permission } = this.state;

    /**
     * write functions to adust dynamically a state attribute that holds the current selections by the user.
     * then assign that attribute to the following "mapping:" instead of "{productName, tracifiedItemID, tracifiedItemtitle, permission }"
     * means it should look like " mapping: this.state.mapping"
     * make sure that state.mapping holds the current selections
     */
    axios.post('/shopify/config/mapping', { mapping: { productName, tracifiedItemID, tracifiedItemtitle, permission } })
      .then((result) => {
        //access the results here....
        console.log(result);
      });

  }



  render() {
    const { productName, tracifiedItemID, tracifiedItemtitle, permission, isTraceListLoading, isProductListLoading } = this.state;

    if (isTraceListLoading || isProductListLoading) {
      return <Spinner />;
      console.log('spinner');
    } else {
      console.log('not spinner');
    }


    return (
      <div class="loader" id="productmapping">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js"></script>


        <Card title="Product Mapping Details">
          <br />
          <form>
            <table className="table table-striped">
              <thead>
                <tr>
                  <td >Product Name</td>
                  <td >Product Item ID</td>
                  <td >Tracified Item title</td>
                  <td >Permission</td>
                </tr>
              </thead>
              <tbody>

                {this.tabRow()}

              </tbody>
              <tfoot>
                


              </tfoot>

            </table>
            <Row>
                  <Col sm="10">
                  </Col>
                  <Col sm="2">
                    <Button primary onClick={this.onSubmit}>Save</Button>
                  </Col>
                </Row>
          </form>
        </Card>
      </div>
    );
    <ProductMapping /> , document.getElementById('productmapping')
    console.log('document thing works');
  }

}

export default ProductMapping;
