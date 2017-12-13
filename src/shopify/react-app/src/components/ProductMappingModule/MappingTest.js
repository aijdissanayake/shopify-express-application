import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductMapping from './ProductMapping ';

var App = React.createClass({
    getInitialState: function(){
      return {
        'productItemID': '',
        'tracifiedItemID': '',
        'permisson': ''
      }
    },
    getData: function(){
      $.ajax({
      url: './ProductMapping',
      dataType: 'jsonp',
      success: function(parsed_json){
        this.setState({ProductItemID: parsed_json['prodicutItemID']});
        this.setState({TracifiedItemID: parsed_json['tracifiedItemID']});
        this.setState({Permisson: parsed_json['permission']});
      }.bind(this)
      });
    },

    handleQuerySearch: function(e) {
        this.setState({zip: e.target.value});
      },
      handleSubmit: function(e) {
        e.preventDefaults();
        this.getData(this.state.zip);
      },

      React.render(
        <App />,
        document.getElementById('app')
      );