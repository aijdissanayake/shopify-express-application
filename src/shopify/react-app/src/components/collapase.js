import React, { Component } from 'react';
import { Container, Collapse, Row, Col } from 'reactstrap';
import { Button, Card, ResourceList, Thumbnail } from '@shopify/polaris';
import * as axios from 'axios';
import { isUndefined } from 'util';

class CollapaseCard extends Component {
    constructor(props) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.fulfillOrder = this.fulfillOrder.bind(this);
        this.state = { collapsed: true };
    }

    toggleCollapse() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    fulfillOrder(){
        const url = '/shopify/shop-api/orders/' + this.props.orderID + '/fulfill';
        axios.get(url)
        .then(response => {
            console.log(response.data);
            alert("order fulfilled!");
            this.props.resetOrders();
        });
    }

    render() {

        console.log("collapse products");
        console.log(this.props.products);
        console.log(typeof this.props.products);
        let resourceList = this.props.itemArray.map((resItem, index) => {
            let productImage = "no/image";
            if (!isUndefined(this.props.products.length) && !isUndefined(this.props.products)) {
                console.log(this.props.products.length);
                const product = this.props.products.filter((product) => {
                    return product.id == resItem.product_id
                });

                if (!isUndefined(product[0])) {
                    productImage = product[0].images[0].src;
                    console.log(productImage);
                }
            }

            let resource = {
                url: '#',
                media: <Thumbnail
                    source={productImage}
                    alt={resItem.title + " Image"}
                />,
                attributeOne: resItem.title,
                attributeTwo: resItem.variant_title,
                attributeThree: resItem.quantity,
            }

            return (
                resource
            );
        });

        return (
            <div>
                <Container>
                    <Row>
                        <Col sm="7">
                            <Row>
                                <Col sm="3">
                                    <Button primary onClick={this.toggleCollapse} >{this.state.collapsed ? "Show Items" : "Hide Items"}</Button>
                                </Col>
                                <Col sm="3">
                                    <Button primary onClick={this.fulfillOrder}>Fulfill Order</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Collapse isOpen={!this.state.collapsed}>
                    <ResourceList
                        items={resourceList}
                        renderItem={(item, index) => {
                            return <ResourceList.Item key={index} {...item} />;
                        }}
                    />

                </Collapse>
            </div>
        );
    }
}

export default CollapaseCard;

