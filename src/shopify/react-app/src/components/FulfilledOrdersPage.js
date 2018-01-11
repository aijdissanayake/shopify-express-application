import React, { Component } from 'react';
import * as axios from 'axios';
import { Page } from '@shopify/polaris';
import FulfilledOrder from './FulfilledOrder';
import Loading from './Loading';

class FulfilledOrdersPage extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            mapping: {},
            shopDomain: "",
            isOrderListLoading: true,
            isMappingLoading: true
        };
    }

    componentDidMount() {
        axios.get('/shopify/config/mapping')
            .then(response => {
                this.setState({ 
                    mapping: response.data,
                    isMappingLoading: false 
                });
            });
        axios.get('/shopify/shop-api/fulfilled-orders')
            .then(response => {
                this.setState({
                    orders: response.data.fulfilledOrders,
                    shopDomain : response.data.shopDomain,
                    isOrderListLoading: false
                });
            });
    }


    render() {

        if (this.state.isOrderListLoading || this.state.isMappingLoading) {
            return <Loading />;
        }
        else {
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
                    id: order.id,
                    order_number: order.order_number,
                    lineItems: lineItems,
                    customer: customer,
                    created_at: order.created_at.substring(0, 10)
                });
            });



            return (
                <Page title="Fulfilled Orders" separator>
                    <table className="table table-striped">
                        <thead>
                          <tr>
                            <td ><b>Order No</b></td>
                            <td ><b>Customer</b></td>
                            <td ><b>Order Item to View</b></td>
                            <td ><b>Trace</b></td>
                          </tr>
                        </thead>
                        <tbody>
          
                        {orderArray.map((order, index) => {
                        
                        return (
                            <FulfilledOrder 
                                key={order.order_number} 
                                order={order} 
                                shopDomain={this.state.shopDomain} 
                                mapping={this.state.mapping} 
                            />
                        )
                    })}
          
                        </tbody>
                      </table>
                </Page>
                
            );
        }
    }
}

export default FulfilledOrdersPage;
