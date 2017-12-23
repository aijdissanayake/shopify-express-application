import React, { Component } from 'react';
import CollapaseCards from './collapase';
import * as axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import { Thumbnail, Card, Page, List } from '@shopify/polaris';
const QRCode = require('qrcode.react');

class Part2Cards extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            products: {}
        };
        this.resetOrders = this.resetOrders.bind(this);
    }



    componentDidMount() {
        axios.get('/shopify/shop-api/products')
            .then(response => {
                const products = response.data.products;
                this.setState({ products: response.data.products });
            });
        axios.get('/shopify/shop-api/orders')
            .then(response => {
                this.setState({ orders: response.data.orders });
            });
    }

    resetOrders(){
        axios.get('/shopify/shop-api/orders')
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
                    product_id: item.product_id

                });
            });
            const customer = order.customer.first_name + " " + order.customer.last_name;
            orderArray.push({
                id : order.id,
                order_number: order.order_number,
                lineItems: lineItems,
                customer: customer,
                created_at: order.created_at.substring(0,10)

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
                                <List type="bullet">
                                <List.Item>Customer  &nbsp;&nbsp;: {order.customer}</List.Item>
                                <List.Item>Created At&nbsp;&nbsp;: {order.created_at}</List.Item>
                            </List>
                                </Col>
                                <Col sm="2">
                                    <QRCode value={qrValue} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <CollapaseCards resetOrders={this.resetOrders} itemArray={order.lineItems} products={this.state.products} orderID={order.id}/>
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
