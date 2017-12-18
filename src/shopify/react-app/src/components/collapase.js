import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { Button, Card, ResourceList, Thumbnail } from '@shopify/polaris';
import * as axios from 'axios';
import { isUndefined } from 'util';

class CollapaseCard extends Component {
    constructor(props) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.state = { collapsed: true };
    }

    toggleCollapse() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {

        // let resItem = this.props.itemArray[0];
        // let resource = {
        //     url: '#',
        //     media: <Thumbnail
        //       source={resItem.featured_image}
        //       alt= {resItem.title + " Image"}
        //     />,
        //     attributeOne: resItem.title,
        //     attributeTwo: resItem.variant_title,
        //     attributeThree: resItem.quantity,
        //   }
        
        console.log("collapse products");
        console.log(this.props.products);
        console.log(typeof this.props.products);
        let resourceList = this.props.itemArray.map((resItem, index) => {
            console.log("collapse products inside map");
            // const imagesURL = 'https://tracified-local-test.herokuapp.com/shopify/shop-api/products/'+ resItem.product_id +'/images';
            // let imageSRCArray = [];
            // if(resItem.product_id){
            // axios.get(imagesURL)
            // .then(response => {
            //     //this.setState({ orders: response.data.orders });

            //     // console.log("images");
            //     // console.log(index);
            //     // console.log(response.data);
            //     imageSRCArray.push(response.data.images[0].src);
            //     //console.log(imageSRCArray);

            // });
            // }
            let productImage = "no/image";
            if (!isUndefined(this.props.products.length) && !isUndefined(this.props.products)) {
                console.log(this.props.products.length);
                const product = this.props.products.filter((product) => {
                    return product.id == resItem.product_id
                });
                
                if (!isUndefined(product[0])){
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
                <Button primary onClick={this.toggleCollapse} >{this.state.collapsed ? "Show Items" : "Hide Items"}</Button>
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

