import React, { Component } from 'react';
import * as axios from 'axios';
import { Page, Button, Stack } from '@shopify/polaris';
import Loading from './Loading';
import CollapseMain from './CollapseMain';
import Uncollapsed from './Uncollapsed';

class Part2Cards extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            orders: [],
            cardStateArray: [],
            products: {},
            isOrderListLoading: true,
<<<<<<< HEAD
            isExpanded: true
=======
            search: ''
>>>>>>> interface-intergration
        };
        this.toggleCardType = this.toggleCardType.bind(this);
        this.resetOrders = this.resetOrders.bind(this);
    }

    handleClick = (index, isClosed) => {
  
        if(!isClosed){
        //reset all values in array to false -> (sets all cards' "isOpen" attributes to false)
        this.state.cardStateArray.fill(false);

        }

        //set only this card's collapse attribute to true
        var temp = this.state.cardStateArray.slice();
        temp[index] = !(temp[index]);
        // replace array with modified temp array
        this.setState({cardStateArray: temp});
    
    }

    toggleCardType() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    componentDidMount() {
        axios.get('/shopify/shop-api/products')
            .then(response => {
                const products = response.data.products;
                this.setState({ products: response.data.products });
            });
        axios.get('/shopify/shop-api/orders')
            .then(response => {
                let arr = [];
                 response.data.orders.forEach((order) => {
                     arr.push(false);
                 });
                this.setState({
                    orders: response.data.orders,
                    isOrderListLoading: false,
                    cardStateArray: arr
                });
            });
    }

    resetOrders() {
        this.setState({
            isOrderListLoading: true
        });
        axios.get('/shopify/shop-api/orders')
            .then(response => {
                this.setState({
                    orders: response.data.orders,
                    isOrderListLoading: false
                });
            });
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value.substr(0, 20)
        });
    }


    render() {

        let buttonText = this.state.isExpanded ? {text:"Switch to collapsed view"} : {text:"Switch to expanded view"}

        if (this.state.isOrderListLoading) {
            return <Loading />;
        }
        else {
            // All the order details
            //var orders = this.state.orders;
            let orders = this.state.orders.filter(
                (order) => {
                    return order.name.indexOf(this.state.search) !== -1;
                }
            );

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

            console.log(orderArray);

            var inputStyle={
                marginLeft: '2%',
                float: 'left',
                padding: '1%',
                fontSize: '17px',
                marginTop: '2%',
                borderStyle: 'dotted',
                marginBottom:'2%'
            }

            return (
                <Page title="Unfulfilled Orders" separator>
                <Stack 
                     distribution="trailing"
                 >
                 <div style={{paddingBottom:10}}>
                 <Stack.Item>
                         <Button 
                             plain
                             size="slim" 
                             outline  
                             onClick={this.toggleCardType} 
                             style={{ marginBottom: '1rem' }}
                         >
                             {buttonText.text}
                         </Button>
                     </Stack.Item>
                 </div>
                     
                 </Stack>

                    <div>
                        <Card>
                            <input
                                type="text"
                                placeholder="Enter the order id"
                                value={this.state.search}
                                onChange={this.updateSearch.bind(this)}
                                style={inputStyle}
                            />
                        </Card>
                    </div>

                    {orderArray.map((order, index) => {
                        const qrValue = order.order_number.toString();
                        const title = "Order ID: " + order.order_number;

                        if(this.state.isExpanded){
                            return (
                                <Uncollapsed 
                                    key={index}
                                    order={order} 
                                    productsProp={this.state.products} 
                                    qrVal={qrValue} 
                                    title={title}
                                />
                       
                            );}else{
                                return (
                                    <CollapseMain 
                                        key={index} 
                                        order={order} 
                                        productsProp={this.state.products} 
                                        qrVal={qrValue} 
                                        title={title}
                                        resetOrders={this.resetOrders}
                                        collapseArray={this.state.cardStateArray}
                                        collapseArrayKey={index}
                                        onClick={this.handleClick}
                                    />
                                );
                            }          
                               
                    })}

                </Page>
            );
        }
    }
}

export default Part2Cards;
