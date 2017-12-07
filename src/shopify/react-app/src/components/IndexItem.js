// IndexItem.js

import React, { Component } from 'react';
import ItemService from './ItemService';
import axios from 'axios';
import TableRow from './TableRow';

class IndexItem extends Component {

  constructor(props) {
      super(props);
      this.state = {value: '', items: ''};
      this.addItemService = new ItemService();
    }
    componentDidMount(){
      axios.get(' https://236717cb.ngrok.io/items')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    tabRow(){

      //const trace = this.state.tracedata;

      if(this.state.items instanceof Array){
        return this.state.items.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        })
      }

      // if(this.state.items instanceof Array){
      //   return this.state.items.map(function(traceobject, i){
      //       return <TableRow traceobj={traceobject} key={i} />;
      //   })
      // }
     
     

    }

    render() {
      return (
        <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>No.</td>
                  <td>Item</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
        </div>
      );
    }
  }

export default IndexItem;