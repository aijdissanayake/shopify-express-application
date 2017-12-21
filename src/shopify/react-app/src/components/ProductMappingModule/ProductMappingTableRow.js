import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProductMappingService from './ProductMappingService';
import 'react-select/dist/react-select.css';
import './AppMP.css';
import ReactDOM  from 'react-dom';
import axios from 'axios';



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
  Select

} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

class ProductMappingTableRow extends Component {
    constructor(props){
        super(props);
        this.state = {
          isToggleOn: true , 
          typed: '', 
          permissionObject: {} , 
          mappingObject: {} , 
          isDisabled:false,
          selectVal : ""
        };     
            
        let testlist = this.props.tracelist;
        let arraytestlist = testlist.split("");
        this.productMappingService = new ProductMappingService();
        this.changeMapping = this.changeMapping.bind(this);
        this.changePermission = this.changePermission.bind(this);
      
     
    }  

   
changeMapping(value, id){
  this.props.updateMapping(value, id);
  this.setState({selectVal : value});
}

changePermission(value, id){
  id = id.substring(2);
  this.props.updatePermission(value, id);
}



render() {
    let traceList = this.props.tracelist.split(" ");
    let traceOptions = [];
    let permission = false;
    let tracifiedItemId = "";
    
    for (let i = 0; i <traceList.length; i=i+4) {
      traceOptions.push({
        key:traceList[i], 
        label:traceList[i+2]
      });
    }

    console.log("initial mapping");
    console.log(this.props.initialMapping);
    if (this.props.initialMapping.hasOwnProperty(this.props.obj.id)) {
      permission = this.props.initialMapping[this.props.obj.id][1]
    }
    console.log(permission);

    const CheckboxID = "CB" + this.props.obj.id

    return (   
        <tr>
          <td>  
            {this.props.obj.title}
            
          </td>
          <td>
          {this.props.obj.id}
          </td>   
                  <td>  
                  <Select 
                  placeholder="Select"
                  options={traceOptions}
                  onChange={this.changeMapping}
                  value = {this.state.selectVal}
                  id={this.props.obj.id}
                  />
                  </td>      
          <td>
           <Checkbox 
           disabled = {false}
           checked = {permission}
           label="Traceability Enabled " 
           onChange={this.changePermission}
           id={CheckboxID}/>
          </td>
        </tr>
    );
   
<ProductMappingTableRow />,
  document.getElementById('root')
  }
}

export default ProductMappingTableRow;
