import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductMappingService from './ProductMappingService';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './AppMP.css';
import ReactDOM from 'react-dom';


import {
  Layout,
  Page,
  FooterHelp,
  Card,
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
  Checkbox,
  ResourceList,

} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

class ProductMappingTableRow extends Component {
  constructor(props) {
    super(props);

    //        this.props.tracelist.forEach(v=>console.log(v.Apple.crop.name));
    let testlist = this.props.tracelist;
    let arraytestlist = testlist.split(" ");

    this.productMappingService = new ProductMappingService();
  }

  // getOptions = (input) => {
  //   return fetch('https://085da154.ngrok.io/pluginAdmin/getTraceData')
  //     .then((response) => {
  //       return response.json();
  //     }).then((json) => {
  //       return { options: json };
  //     });
  // }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(e);
    console.log(e.target.vaue);
  }


  onSubmit = (e) => {
    console.log('console');
    e.preventDefault();
    // get our form data out of state
    const { productName, tracifiedItemID, tracifiedItemtitle, permisison } = this.state;

    // const passData = {};

    // for (const pass in this.refs) {

    //   passData[pass] = this.refs[pass].value;
    // }

    // console.log('-->', passData);
  }



  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.productMappingService.deleteData(this.props.obj.id);
  // }





  render() {

    let testlist = this.props.tracelist;
    let arraytestlist = testlist.split(" ");

    let options = [<option disabled selected>Select Trace ID</option>];
    let traceList = this.props.tracelist;

    for (let i = 0; i < arraytestlist.length; i = i + 4) {
      options.push(<option key={arraytestlist[i].id} value={arraytestlist[i].title}>{arraytestlist[i]}</option>);
    }






    return (



      <tr>
        <form onSubmit={this.onSubmit}>

          <td>
            <input onChange={this.onChange} > {this.props.obj.title} </input>
          </td>
          <td>
            <input> {this.props.obj.id}</input>
          </td>
          <td>
            <input>
              <Badge>
                <select>
                  {options}
                </select>
              </Badge>
            </input>
          </td>

          <td>
            <input>
              <Checkbox label="Traceability Enabled " />
            </input>
          </td>











        </form>



      </tr>





    );




  }
}



export default ProductMappingTableRow;