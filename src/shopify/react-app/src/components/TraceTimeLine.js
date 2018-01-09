import React, { Component } from 'react';
import Loading from './Loading';
import * as axios from 'axios';
import {
    Spinner,
    Card,
    Page
} from '@shopify/polaris';
import { Row, Col, Container } from 'reactstrap';
import {Timeline, TimelineEvent} from 'react-event-timeline';

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

        //OLD CODE --------------------------

        // var description = {
        //     padding: "2% 2% 2% 7%",
        //     fontSize: 16
        // };

        // var line = {
        //     "margin": "90% 35% 35% 35%",
        //     "border-size": "0.5px",
        //     "border-width": "thin",
        //     "border-style": "solid",
        //     "border-color": "black",
        //     "height": "500px",
        //     "width": "0%"
        // }

        //OLD CODE ----------------------------


        if (this.state.istimelineLoading) {
            return <Loading />;
        }
        else {
            console.log(this.props.match.params.orderID);
            console.log(this.props.match.params.itemID);
            return (
                <div style={{backgroundColor: '#f4f6f8'}}>
                    <Page title="Trace Back Timeline" separator>    
                        <Timeline>
                        {this.state.timeline.items.map((stage, index) => {

                            let titleText = (index+1)+". "+stage.title;
                            let descriptionText = stage.description;

                            var ico = (<svg height="20" width="20" >
                                            <image width="20" height="20" xlinkHref={stage.icon}  />    
                                        </svg>);

                            return(
                                <TimelineEvent
                                    key={index}
                                    title={titleText}
                                    titleStyle={{fontSize:17}}
                                    subtitle={descriptionText}
                                    subtitleStyle={{fontSize:15}}
                                    icon={ico}
                                    iconColor="#6fba1c"
                                    contentStyle={{fontSize:13}}
                                >
                                    {

                                        Object.keys(stage.data).map(function (key) {
                                            return <div key={key}> {stage.data[key].title}</div>;
                                        })

                                    }
                                </TimelineEvent>                                    
                            );

                        })}
                        </Timeline>
                    </Page>
                </div>

                //OLD CODE ----------------------------

                // <Page title="Trace Back Timeline" separator>
                //     <DisplayText size="small">

                //         {this.state.timeline.items.map((stage, index) => {
                //             return (
                //                 <Card key={stage.stage}
                //                 >
                //                     <Card.Section>
                //                         <Row>
                //                             <Col sm='1'>
                //                                 <Avatar
                //                                     customer
                //                                     name="Farrah"
                //                                     source={stage.icon}
                //                                 />
                //                             </Col>
                //                             <Col sm='11'>
                //                             <TextStyle variation='strong' >
                //                                 {index+1}.&nbsp;{stage.title}

                //                             </TextStyle>
                //                             </Col>   
                //                         </Row>
                //                         <div >
                //                             <Row>
                //                                 <Col sm="1">
                //                                     {/* <div style={line}></div> */}
                //                                     <hr width="1" size="500"/>
                //                                 </Col>
                //                                 <Col sm="11">
                //                                     <Heading> <div > {stage.description} </div> </Heading> <br />

                //                                     {

                //                                         Object.keys(stage.data).map(function (key) {
                //                                             return <div> {stage.data[key].title}</div>;
                //                                         })

                //                                     }
                //                                 </Col>
                //                             </Row>
                //                         </div>


                //                     </Card.Section>
                //                 </Card>



                //             )
                //         })}

                //     </DisplayText>
                // </Page>

                //OLD CODE ----------------------------

            );
        }
    }
}

export default TraceTimeLine;
