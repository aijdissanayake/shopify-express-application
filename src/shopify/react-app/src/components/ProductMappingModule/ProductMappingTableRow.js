import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProductMappingService from './ProductMappingService';
//import Select from 'react-select';
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
        this.state = {isToggleOn: true , typed: '', permissionObject: {} , mappingObject: {} , isDisabled:false};     
            
//        this.props.tracelist.forEach(v=>console.log(v.Apple.crop.name));
        let testlist = this.props.tracelist;
        let arraytestlist = testlist.split("");

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

  
   


    

    changeIt(e){
           
          this.setState({isDisabled: false});
        
          const final = e.target.value;
          console.log(e.target)
          console.log(e.checked)

            console.log('Hi');
            
            console.log(final);
            console.log(this.props.obj.id);
            console.log(this.props.obj.title);

            this.state.mappingObject[this.props.obj.id] =[final , false];
            console.log(this.state.mappingObject);
            
          } 
          
          
    changeTht(newValue, id){
                
                console.log(newValue);
                console.log(id);
               
                // const final = e.target.checked;
                  console.log('Hi map');
               
                  this.state.permissionObject[id] = newValue;
                  console.log(this.state.permissionObject);

                  this.state.mappingObject[this.props.obj.id][1] = newValue;
                  console.log(this.state.mappingObject);
                }

    
   
               


render() {

  let testlist = this.props.tracelist;
  let arraytestlist = testlist.split(" ");
  
    let options = [<option  disabled selected>Select Trace ID</option>];
    // let traceList = this.props.tracelist;
   console.log(arraytestlist);
    for (let i = 0; i <arraytestlist.length; i=i+4) {
      console.log("arraytestlist");
      console.log(arraytestlist[i].id);
      console.log(arraytestlist[i].title);
      options.push(<option 
        key={arraytestlist[i].id} 
        value={arraytestlist[i].title}>{arraytestlist[i]}</option>);
    }

    let traceList = this.props.tracelist.split(" ");
    let traceOptions = [];
    console.log(traceList);
    
    for (let i = 0; i <traceList.length; i=i+4) {
      console.log("traceList");
      console.log(traceList[i]);
      console.log(traceList[i+2]);
      traceOptions.push({
        key:traceList[i], 
        label:traceList[i+2]});
    }

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
                  options={traceOptions}
                  placeholder="Select"
                  id={this.props.obj.id}
                  onChange={this.props.updateMapping}
                  />

                  </td>
                 
                 
                  
               
            
              
          <td>
           <Checkbox 
           disabled = {false}
           label="Traceability Enabled " 
           onChange={this.props.updatePermission}/>
           {/* onChange={this.changeTht.bind(this)}/> */}
          </td>

         
      
         
       
          

          
      
       
       
        

         

        </tr>

   
      

    );
   
<ProductMappingTableRow />,
  document.getElementById('root')
  }
}




export default ProductMappingTableRow;