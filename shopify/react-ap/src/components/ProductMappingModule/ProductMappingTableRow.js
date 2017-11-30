import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProductMappingService from './ProductMappingService';
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
  Select,
  Checkbox
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

class ProductMappingTableRow extends Component {
    constructor(props){
        super(props);

        this.productMappingService = new ProductMappingService();
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.productMappingService.deleteData(this.props.obj.id);
    }
   
  


  render() {
    return (
        <tr>
          <td>
          <Badge>
                     <Select
                        options={[ this.props.obj.title
                                    
                        ]}
                         placeholder="Traceability Product IDs"
                      />
                      </Badge>

          </td>
          <td>
            {this.props.obj.title}
          </td>
          <td>
          {this.props.obj.id}
          </td>
          <td>
           
           </td>
              
          <td>
           <Checkbox label="Traceability Enabled " />
          </td>
          <td>
          <form onSubmit={this.handleSubmit}>
             
            </form>
          </td>
        </tr>
    );
  }
}

export default ProductMappingTableRow;