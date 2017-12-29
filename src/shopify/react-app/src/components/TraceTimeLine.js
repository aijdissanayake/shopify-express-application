import React, { Component } from 'react';
import Loading from './Loading';
import * as axios from 'axios';
import {
    Spinner,
    DisplayText,
    TextStyle,
    Card,
    Page,
    Avatar,
    Heading
} from '@shopify/polaris';
import { Row, Col, Container } from 'reactstrap';


class TraceTimeLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeline: "",
            istimelineLoading: true
        };
    }

    componentDidMount() {
        const traceURL = "/shopify/tracified/trace/" + this.props.match.params.orderID + "/" + this.props.match.params.itemID;

        axios({
            method: 'get',
            url: traceURL, 
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        })
            .then(response => {
                let timeline = response.data[2];
                this.setState({
                    timeline: timeline,
                    istimelineLoading: false
                });
            });

    }

    render() {


        var description = {
            padding: "2% 2% 2% 7%",
            fontSize: 16
        };

        var line = {
            "margin": "90% 35% 35% 35%",
            "border-size": "0.5px",
            "border-width": "thin",
            "border-style": "solid",
            "border-color": "black",
            "height": "500px",
            "width": "0%"
        }



        if (this.state.istimelineLoading) {
            return <Loading />;
        }
        else {
            console.log(this.props.match.params.orderID);
            console.log(this.props.match.params.itemID);
            return (
                <Page title="Trace Back Timeline" separator>
                    <DisplayText size="small">

                        {this.state.timeline.items.map((stage, index) => {
                            return (
                                <Card key={stage.stage}
                                >
                                    <Card.Section>
                                        <Row>
                                            <Col sm='2'>
                                                <Avatar
                                                    customer
                                                    name="Farrah"
                                                    source={stage.icon}
                                                />
                                            </Col>
                                            <Col sm='10'>
                                            <TextStyle variation='strong' >
                                                {index+1}.&nbsp;{stage.title}

                                            </TextStyle>
                                            </Col>   
                                        </Row>
                                        <div >
                                            <Row>
                                                <Col sm="1">
                                                    {/* <div style={line}></div> */}
                                                    <hr width="1" size="500"/>
                                                </Col>
                                                <Col sm="8">
                                                    <Heading> <div > {stage.description} </div> </Heading> <br />

                                                    {

                                                        Object.keys(stage.data).map(function (key) {
                                                            return <div> {stage.data[key].title}</div>;
                                                        })

                                                    }
                                                </Col>
                                            </Row>
                                        </div>


                                    </Card.Section>
                                </Card>



                            )
                        })}

                    </DisplayText>
                </Page>

            );
        }
    }
}

export default TraceTimeLine;
