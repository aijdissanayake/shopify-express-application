import React, { Component } from 'react';
import Loading from './Loading';
import * as axios from 'axios';
import {
    Spinner,
    DisplayText,
    TextStyle
} from '@shopify/polaris';

class TraceTimeLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            OTP:"",
            isOTPLoading: true
        };
    }

    componentDidMount() {
        const traceURL = "/shopify/tracified/trace/"+this.props.match.params.orderID+"/"+this.props.match.params.itemID;
        axios.get(traceURL)
            .then(response => {
                this.setState({
                    OTP: response.data,
                    isOTPLoading: false
                });
            });

    }

    render() {
        if (this.state.isOTPLoading) {
            return <Loading />;
        }
        else {
            console.log(this.props.match.params.orderID);
            console.log(this.props.match.params.itemID);
            return (
                <div style={{ padding: '5% 0 0 37%' }}>
                    <DisplayText size="small"                >
                        <TextStyle variation="subdued">
                            <b>Trace Time Line</b> for<br />
                            Order ID : {this.props.match.params.orderID}<br />
                            Shopify Product ID  : {this.props.match.params.itemID}<br />
                            Should go here.<br/>
                            OTP: {JSON.stringify(this.state.OTP)}

                    </TextStyle>
                    </DisplayText>
                </div>
            );
        }
    }
}


export default TraceTimeLine;
