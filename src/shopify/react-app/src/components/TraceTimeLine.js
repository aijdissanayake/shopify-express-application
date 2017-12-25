import React, { Component } from 'react';
import {
    Spinner,
    DisplayText,
    TextStyle
} from '@shopify/polaris';

class TraceTimeLine extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.match.params.orderID);
        console.log(this.props.match.params.itemID);        
        return (
            <div style={{ padding: '5% 0 0 37%' }}>
                <DisplayText  size="small"                >
                    <TextStyle variation="subdued">
                    <b>Trace Time Line</b> for<br/>
                    Order ID : {this.props.match.params.orderID}<br/>
                    Shopify Product ID  : {this.props.match.params.itemID}<br/>
                    Should go here
                    </TextStyle>
                </DisplayText>
            </div>
        );
    }
}


export default TraceTimeLine;
