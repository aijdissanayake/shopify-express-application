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
          CBdisabled : true,
          CBchecked : false,
          selectVal : ""
        };     
            
        let testlist = this.props.tracelist;
        let arraytestlist = testlist.split("");
        this.productMappingService = new ProductMappingService();
        this.changeMapping = this.changeMapping.bind(this);
        this.changePermission = this.changePermission.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
        this.onPermissionChange = this.onPermissionChange.bind(this);
      
     
    }  

   
changeMapping(value, id){
  this.props.updateMapping(value, id);
  this.setState({selectVal : value});
}

changePermission(value, id){
  id = id.substring(2);
  this.props.updatePermission(value, id);
}

onItemChange(tracifiedItemID, shopifyProductID){
  console.log(tracifiedItemID);
  if(!(tracifiedItemID=="noItem")){
    this.setState({
      CBdisabled : false,
      selectVal : tracifiedItemID
    });
    console.log("true");
  }
  else{
    this.setState({
      CBdisabled : true,
      selectVal : tracifiedItemID,
      CBchecked : false
    });
    console.log("false");
  }
  this.props.onItemChange(tracifiedItemID, shopifyProductID);
}

onPermissionChange(permission, shopifyProductID){
    this.setState({CBchecked : !this.state.CBchecked});
    shopifyProductID = shopifyProductID.substring(2);
    this.props.onPermissionChange(permission, shopifyProductID);
}



render() {
    let traceList = this.props.tracelist.split(" ");
    let traceOptions = [{
      value:"noItem",
      label:"No Item"
    }];
    let permission = false;
    let tracifiedItemId = "";
    
    for (let i = 0; i <traceList.length; i=i+4) {
      traceOptions.push({
        value:traceList[i], 
        label:traceList[i+2]
      });
    }

    if (this.props.mapping.hasOwnProperty(this.props.obj.id)) {
      // this.setState({
      //   CBchecked : this.props.mapping[this.props.obj.id][1],
      //   CBdisabled : false
      // });
      this.state.CBchecked = this.props.mapping[this.props.obj.id][1];
      this.state.CBdisabled = false;
    }

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
                  onChange={this.onItemChange}
                  value = {this.state.selectVal}
                  id={this.props.obj.id}
                  />
                  </td>      
          <td>
           <Checkbox 
           disabled = {this.state.CBdisabled}
           label="Traceability Enabled" 
           onChange={this.onPermissionChange}
           id={CheckboxID}
           checked = {this.state.CBchecked}/>
          </td>
        </tr>
    );
   
<ProductMappingTableRow />,
  document.getElementById('root')
  }
}

export default ProductMappingTableRow;
