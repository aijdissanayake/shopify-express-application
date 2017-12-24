import React, { Component } from 'react';
import {
    Spinner,
    DisplayText,
    TextStyle
} from '@shopify/polaris';

class Loading extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={{ padding: '5% 0 0 37%' }}>
                <DisplayText  size="small"                >
                    <TextStyle variation="subdued">Loading... Please Wait!</TextStyle>
                </DisplayText><br />
                <div style={{ padding: '0 0 0 10%' }}>
                    <Spinner
                        size="large"
                        color="teal"
                        accessibilityLabel="Loading"
                    />
                </div>
            </div>
        );
    }
}


export default Loading;
