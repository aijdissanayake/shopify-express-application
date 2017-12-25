import React, { Component } from 'react';
import Loading from './Loading';
import * as axios from 'axios';
import {
    Spinner,
    DisplayText,
    TextStyle,
    Card,
    Page
} from '@shopify/polaris';

class TraceTimeLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            OTP: "",
            isOTPLoading: true
        };
    }

    componentDidMount() {
        const traceURL = "/shopify/tracified/trace/" + this.props.match.params.orderID + "/" + this.props.match.params.itemID;
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
                <Page title="Trace Back Timeline" separator>
                    <DisplayText size="small">
                        <TextStyle variation="subdued">
                            {this.state.OTP.map((stage, index) => {
                                return (
                                    <Card key={stage.stageId} title={stage.name}>
                                        {stage.traceabilityData.map((traceabilityData, index) => {
                                            const data = traceabilityData.name + " - " + traceabilityData.type;
                                            return (
                                                <Card.Section>{data}</Card.Section>
                                            )
                                        })}
                                    </Card>
                                )
                            })}
                        </TextStyle>
                    </DisplayText>
                </Page>
            );
        }
    }
}

export default TraceTimeLine;
