import React, { Component } from 'react';
import { Button,Select } from '@shopify/polaris';

class FulfilledOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber : this.props.order.order_number,
            itemID : this.props.order.lineItems[0].product_id
        };
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onTraceSelect = this.onTraceSelect.bind(this);
    }

    onSelectItem(itemID, orderNumber){
        this.setState({itemID: itemID});
    }

    onTraceSelect(){
        alert("Item id : " + this.state.itemID + " Order Number : " + this.state.orderNumber);
    }

    render() {
        const order = this.props.order;
        var itemOptions = [];
        order.lineItems.forEach(item => {
            itemOptions.push({
                value: item.product_id,
                label: item.title
            });
        });
        return (
            <tr>
                <td>
                    {order.order_number}
                </td>
                <td>
                    {order.customer}
                </td>
                <td>
                    <Select
                        options={itemOptions}
                        placeholder="Select an Item to view"
                        id={order.order_number}
                        onChange={this.onSelectItem}
                        value={this.state.itemID}
                    />
                </td>
                <td>
                    <Button  size="slim" onClick={this.onTraceSelect}>View Trace More Timeline</Button>
                </td>
            </tr>
        );
    }
}

export default FulfilledOrder;
