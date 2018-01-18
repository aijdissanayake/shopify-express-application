import React, { Component } from 'react';
import CollapaseCards from './collapase';
import * as axios from 'axios';
import { Container, Row, Col} from 'reactstrap';
import { Thumbnail, Card, Page, List } from '@shopify/polaris';
import Loading from './Loading';
const QRCode = require('qrcode.react');

class Uncollapsed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {

        return (
            <Card key={this.props.order.order_number} title={this.props.title} sectioned subdued={false}>
                <Row>
                    <Col sm="10">                                    
                        <List type="bullet">
                            <List.Item>Customer  : {this.props.order.customer}</List.Item>
                            <List.Item>Created At: {this.props.order.created_at}</List.Item>
                        </List>
                    </Col>
                    <Col sm="2">
                        <QRCode value={this.props.qrVal} />
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <CollapaseCards itemArray={this.props.order.lineItems} products={this.props.productsProp} orderID={this.props.order.id
                        } />
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Uncollapsed;