import React, { Component } from 'react';
import Collapse2 from './collapse2';
import * as axios from 'axios';
import { Row, Col, Card, Collapse } from 'reactstrap';
import { Thumbnail, Page, Button, Stack, TextStyle } from '@shopify/polaris';
const QRCode = require('qrcode.react');

class CollapseMain extends Component {

    constructor() {
        super();
        this.fulfillOrder = this.fulfillOrder.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false
        };
    }

    fulfillOrder(){
        const url = '/shopify/shop-api/orders/' + this.props.order.id + '/fulfill';
        axios.get(url)
        .then(response => {
            console.log(response.data);
            alert("order fulfilled!");
            this.props.resetOrders();
        });
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });  
    }

    render() {

        let buttonProps = this.state.collapse ? {text:"Hide Details"} : {text:"View Details"}
        let cardStyle = {   backgroundColor: 'white',
                            margin: 10,
                            padding: 10,
                            boxShadow: "0.2px 0.2px 1px 0.5px rgba(0, 0, 0, .2)"
                        }
    
        return (

            <Card style={cardStyle}>
                <Row style={{ paddingBottom: 5}}>
                    <Col sm="2" style={{paddingBottom:5, paddingTop:5}}>
                        <TextStyle variation="strong">{this.props.title}</TextStyle>
                    </Col>
                    <Col sm="3" style={{paddingBottom:5, paddingTop:5}}>
                        <TextStyle variation="subdued"><strong>Created on:</strong> {this.props.order.created_at}</TextStyle>
                    </Col>
                    <Col xs="3" sm="5" style={{paddingTop:5, paddingBottom:5, paddingRight: 0, width: 420}}>
                        <TextStyle variation="subdued"><strong>Customer:</strong> {this.props.order.customer}</TextStyle>
                    </Col>
                    <Col sm="2" style={{paddingRight: 0, width: 130}}>
                        <Button 
                            size="slim" 
                            outline  
                            onClick={this.toggle} 
                        >
                            {buttonProps.text}
                        </Button>
                    </Col>
                </Row >
                <Collapse isOpen={this.state.collapse} style={{marginTop:8 , borderTop: '2px solid rgba(0, 0, 0, .3)'}}>
                    <Row style={{paddingTop: '1rem' }}>
                        <Col sm="12">
                            <Row style={{padding: 20}}>
                                <Col sm="3" style={{paddingBottom: 20}}>
                                    <Button primary onClick={this.fulfillOrder}>Mark as Fulfilled</Button>
                                </Col>
                                <Col sm="7">
                                </Col >
                                <Col sm="2">
                                    <QRCode value={this.props.qrVal} /> 
                                </Col >
                            </Row>
                            <Row style={{paddingRight: 20, paddingLeft: 20}}>   
                                <Collapse2 itemArray={this.props.order.lineItems} products={this.props.productsProp} />
                            </Row>    
                            <Collapse2 itemArray={this.props.order.lineItems} products={this.props.productsProp} />
                        </Col>
                    </Row>
                </Collapse>
                            
            </Card>
                
        );
    }
}

export default CollapseMain;
