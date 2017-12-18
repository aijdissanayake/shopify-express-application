import React, { Component } from 'react';
import CollapaseCards from './collapase';
import * as axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import { Thumbnail, Card, Page } from '@shopify/polaris';
const QRCode = require('qrcode.react');

class Part2Cards extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            products: {}
        };
    }



    componentDidMount() {
        axios.get('https://tracified-local-test.herokuapp.com/shopify/shop-api/products')
        .then(response => {
            const products = response.data.products;
            console.log(response.data.products);
            const imageSRC = products.filter((product) => {
               return product.title == "Apple"
            });
            console.log("Apple image");
            console.log(imageSRC[0].images[0].src);
            
            this.setState({ products: response.data.products });
        });
        axios.get('https://tracified-local-test.herokuapp.com/shopify/shop-api/orders')
            .then(response => {
                this.setState({ orders: response.data.orders });
            });
    }


    render() {


        // All the order details
        var orders = this.state.orders;
        console.log(orders);

        var orderArray = [];
        orders.forEach((order) => {
            var items = order.line_items;
            var lineItems = [];
            items.forEach(item => {
                lineItems.push({
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    variant_title: item.variant_title,
                    product_id:item.product_id
                });
            });
            orderArray.push({
                order_number: order.order_number,
                lineItems: lineItems
            });
        });

        console.log(orderArray);

        return (
            <Page title="Unfulfilled Orders" separator>

                {orderArray.map((order, index) => {
                    const qrValue = order.order_number.toString();
                    const title = "Order ID: " + order.order_number;
                    return (
                        <Card key={order.order_number} title={title} sectioned subdued={false}>
                            <Row>

                                <Col sm="10">
                                </Col>
                                <Col sm="2">
                                    <QRCode value={qrValue} />
                                </Col>
                            </Row>
                            <Row>
                            <Col sm="12">
                                    <CollapaseCards itemArray={order.lineItems} products={this.state.products}/>
                                </Col>
                            </Row>
                        </Card>
                    )
                })}
            </Page>
        );
    }
}

export default Part2Cards;
