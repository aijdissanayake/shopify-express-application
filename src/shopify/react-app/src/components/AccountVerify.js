import React, { Component } from 'react';
import '@shopify/polaris/styles.css';
import { Row, Col } from 'reactstrap';
import * as axios from 'axios';
import {
    AccountConnection,
    Page,
    TextField,
    Button,
    TextStyle,
    VisuallyHidden,
    Heading,
    FormLayout,
    Card

} from '@shopify/polaris';


class AccountVerify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempToken: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(token, id) {
        this.setState({
            tempToken: token
        });
    }

    onClick() {

        const tempToken = this.state.tempToken;
        axios.post('/shopify/tracified/account/verify', { tempToken })
            .then((response) => {
                // alert("Account verified successfully " + result.data);
                window.location.replace('/shopify/main-view');
                // window.location.href = response.redirect;
                console.log(response);
            }).catch((err) =>{
                console.log(err);
            });
    }

    render() {
        return (
            <Page>
                <Card title="Tracified Account Connection ">
                    <FormLayout>
                        <Card.Section>
                            <p> Looks like you haven't connected a Tracified Account yet.</p>
                            <p> Please Contact your Tracified Admin and submit the temporary token here to connect an account for further proceedings</p>
                        <Row>
                            <Col sm="8" offset="2">
                                <TextField onChange={this.onChange} value={this.state.tempToken} label="Enter the access token" />
                            </Col>
                            <Col sm="4" offset="2">
                                <Button primary onClick={this.onClick}>Connect</Button>
                            </Col>
                        </Row>                            
                        </Card.Section>
                        <Card.Section></Card.Section>
                    </FormLayout>
                    <Row>
                    </Row>
                </Card>
            </Page>
        );
    }
}

export default AccountVerify;
