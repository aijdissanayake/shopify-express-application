import React, { Component } from 'react';
import { Button, Select } from '@shopify/polaris';
import { EmbeddedApp, Alert, Modal } from '@shopify/polaris/embedded';

class FulfilledOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: this.props.order.order_number,
            itemID: this.props.order.lineItems[0].product_id,
            modalOpen : false
        };
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onTraceSelect = this.onTraceSelect.bind(this);
    }

    onSelectItem(itemID, orderNumber) {
        this.setState({ itemID: itemID });
    }

    onTraceSelect() {
        console.log("shop domain");
        console.log(this.props.shopDomain);
        if(this.state.itemID == "noTraceability"){
            alert("NO Traceability");
        }
        else{
            this.setState({modalOpen: true});
        }
    }

    render() {
        const order = this.props.order;
        const mapping = this.props.mapping;
        var itemOptions = [];
        order.lineItems.forEach(item => {
            let value = "noTraceability";
            if (mapping.hasOwnProperty(item.product_id) && mapping[item.product_id][1]){
                value = mapping[item.product_id][0];
            }
            itemOptions.push({
                value: value,
                label: item.title
            });
        });
        const shopOrigin = "https://"+this.props.shopDomain;
        const modalURL = "/shopify/trace/"+this.state.orderNumber+"/"+this.state.itemID;
        console.log(modalURL);
        console.log(this.props.mapping);
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
                    <Button size="slim" onClick={this.onTraceSelect}>View Trace More Timeline</Button>
                    <EmbeddedApp
                        apiKey="7f3bc78eabe74bdca213aceb9cfcc1f4"
                        shopOrigin={shopOrigin}
                    >
                        <Modal
                            src={modalURL}
                            open={this.state.modalOpen}
                            title="Tracified - Trust Through Traceability"
                            primaryAction={{
                                content: 'Close',
                                onAction: () => this.setState({ modalOpen: false }),
                            }}
                            onClose={() => this.setState({ modalOpen: false })}
                        />
                    </EmbeddedApp>
                </td>
            </tr>
        );
    }
}

export default FulfilledOrder;
