import React, { Component } from 'react';
import './App.css';
import Background from './background_image.png';
import '@shopify/polaris/styles.css';
import { Tabs,
        PageActions,
         Button,
         Card,
         Badge
} from '@shopify/polaris';
import { Link } from 'react-router-dom';

//import sectionStyle from 


class App extends React.Component {

  
  
  render() {
    //var bg=require('./background_image.png')
    var sectionStyle = {
      width: "90%",
      height: "257px",
  
     backgroundImage: "url(" + Background + ")",
     
     
      
          };
      
    return (

      
      
       <div  >
       
      
        <header 
  text-align= "center">
       <section 
      style={ sectionStyle }>
    

         
        
      
        
       

        {
        

          /* /* {

        <Tabs 
          selected={3}
          tabs={[
    <Link to ='/shopify/product-mapping' >
  
    Orders
  
    </Link>,
    {
      
      id: 'Mapping',
      title: 'Mapping',
      link : '/product-mapping',
      onClick:'/product-mapping',
      
    },
    {
      id: 'Installation',
      title: 'Installation',
      panelID: 'repeat-customers-content',
      Link: 'www.google.com'  ,  
    },
  
  ]}
/> } */}
</section>
</header>

<div id="App-body">
<Badge>
<Link to="/product-mapping">Orders</Link>
</Badge>

<Link to="/zillow-group">     </Link>
<Badge>
<Link to="/product-mapping"> Installation </Link>
</Badge>
<Link to="/modus-create">    </Link>
<Badge>
<Link to="/product-mapping">Mapping</Link>
</Badge>
</div>
      </div>
      

    );
  }
}

export default App;
