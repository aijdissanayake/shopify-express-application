import React, { Component } from 'react';
import Collapse2 from './collapse2';
import * as axios from 'axios';
import { Row, Col, Collapse } from 'reactstrap';
import { Thumbnail, Card, Page, Button, Stack, TextStyle } from '@shopify/polaris';
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
    
        return (

            <Card key={this.props.order.order_number} sectioned subdued={false}>
                <Stack>
                    <Stack.Item >
                        <TextStyle variation="strong">{this.props.title}</TextStyle>
                    </Stack.Item>
                    <Stack.Item>
                        <TextStyle variation="subdued"><strong>Created on:</strong> {this.props.order.created_at}</TextStyle>
                    </Stack.Item>
                    <Stack.Item fill>
                        <TextStyle variation="subdued"><strong>Customer:</strong> {this.props.order.customer}</TextStyle>
                    </Stack.Item>
                    <Stack.Item>
                        <Button 
                            size="slim" 
                            outline   
                            onClick={this.toggle} 
                            style={{ marginBottom: '1rem' }}
                        >
                            {buttonProps.text}
                        </Button>
                    </Stack.Item>
                </Stack>
                <Collapse isOpen={this.state.collapse}>
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
