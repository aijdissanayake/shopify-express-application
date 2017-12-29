import React, { Component } from 'react';
import { Button, Select } from '@shopify/polaris';
import { EmbeddedApp, Alert, Modal } from '@shopify/polaris/embedded';

class FulfilledOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: this.props.order.order_number,
            productID: this.props.order.lineItems[0].product_id,
            modalOpen: false,
            alertOpen: false,
            itemID: this.props.mapping.hasOwnProperty(this.props.order.lineItems[0].product_id) ? (this.props.mapping[this.props.order.lineItems[0].product_id][1] ? this.props.mapping[this.props.order.lineItems[0].product_id][1] : "noTraceabilityItem") : "noTraceabilityItem"
        };
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onTraceSelect = this.onTraceSelect.bind(this);
    }

    onSelectItem(productID, orderNumber) {
        const mapping = this.props.mapping;
        let itemID = "noTraceabilityItem";
        if (mapping.hasOwnProperty(productID) && mapping[productID][1]) {
            itemID = mapping[productID][0];
        }
        this.setState({
            itemID: itemID,
            productID: productID
        });
    }

    onTraceSelect() {
        if (this.state.itemID == "noTraceabilityItem") {
            console.log(this.state.itemID);
            this.setState({ alertOpen: true });
        }
        else {
            this.setState({ modalOpen: true });
            console.log(this.state.itemID);
        }
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
        const shopOrigin = "https://" + this.props.shopDomain;
        const modalURL = "/shopify/trace/" + this.state.orderNumber + "/" + this.state.itemID;
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
                        value={this.state.productID}
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
                            width="fullwidth"
                            open={this.state.modalOpen}
                            title="Tracified - Trust Through Traceability"
                            primaryAction={{
                                content: 'Close',
                                onAction: () => this.setState({ modalOpen: false }),
                            }}
                            onClose={() => this.setState({ modalOpen: false })}
                        />
                    </EmbeddedApp>
                    <EmbeddedApp
                        apiKey="7f3bc78eabe74bdca213aceb9cfcc1f4"
                        shopOrigin={shopOrigin}
                    >
                        <Alert
                            title="Tracified"
                            open={this.state.alertOpen}
                            confirmContent="Close"
                            onConfirm={() => this.setState({ alertOpen: false, alertConfirmed: true })}
                        >
                            Traceability Not available for this Product!
                        </Alert>
                    </EmbeddedApp>
                </td>
            </tr>
        );
    }
}

export default FulfilledOrder;
