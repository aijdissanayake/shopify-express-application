import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProductMappingService from './ProductMappingService';
import Select from 'react-select';
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

} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

class ProductMappingTableRow extends Component {
    constructor(props){
        super(props);
        this.state = {isToggleOn: true , typed: ''};     
            
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

  
   


    

    changeIt(e){
      
          const final = e.target.value;
          console.log(e.target)

            console.log('Hi');
            console.log(final);
            
          } 
          
          
    // changeTht(e){
            
    //            const target = e.target;
    //         //   const final = target.type == 'checkbox' ? target.checked : target.value;

    //            //const final = e.target.checked;
    //               console.log('Hi');
    //               console.log(final);
                  
    //             }
    
   
   
    


render() {

  let testlist = this.props.tracelist;
  let arraytestlist = testlist.split(" ");
  
    let options = [<option  disabled selected>Select Trace ID</option>];
    let traceList = this.props.tracelist;
   
    for (let i = 0; i <arraytestlist.length; i=i+4) {
      options.push(<option key={arraytestlist[i].id} value={arraytestlist[i].title}>{arraytestlist[i]}</option>);
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
                   <Badge>
                  <select  type= "dropdown" onChange={this.changeIt.bind(this)}>
                    {options}
                  </select>
                  </Badge>

                  </td>
                 
                 
                  
               
            
              
          <td>
           <Checkbox label="Traceability Enabled " onChange={this.changeIt.bind(this)}/>
          </td>

         
      
         
       
          

          
      
       
       
        

         

        </tr>

   
      

    );
   
<ProductMappingTableRow />,
  document.getElementById('root')
  }
}




export default ProductMappingTableRow;