import React, { Component } from 'react';
import { Card, DisplayText, Button } from '@shopify/polaris';
import { Container, Row, Col } from 'reactstrap';
import './install.css';

class Installation extends Component {
    render() {
        var liStyle = {
            marginTop: '2%'
        }

        var lastIntPara = {
            marginBottom: '2%'
        }

        return (
            <div>
                <div class="InstallTitle">
                    <DisplayText size="medium">Installation Instructions</DisplayText>
                </div>
                <div class="InstallVideo">
                    <iframe width="560" height="415" src="https://www.youtube.com/embed/1zVRoaq-wDA?rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
                </div>
                <div class="InstallDescription">
                    <Card>
                        <ol>
                            <li style={liStyle}>
                                From the Shopify Admin panel, click on <code>"Online Store"</code>
                            </li>
                            <li>
                                Click on the <code>Actions</code> dropdown button for the current published theme and select <code>Edit Code</code>.
                            </li>
                            <li>Select the file to be edited depending on the theme.
                                <ul>
                                    <br />
                                    <li>For a Sectioned Theme, locate and click on product.liquid under the Templates folder to open it for editing. </li>
                                    <li>For a Non-Sectioned Theme, locate and click on product-template.liquid under the Sections folder to open it for editing. <br />(The liquid file should contain the details of the products.)</li>
                                </ul>

                            </li>
                            <li>
                                Subsequently, following liquid code snippet should be included in the selected liquid file and save the changes. <br /><br />
                                <code>
                                    {"{% include 'tracified' %}"}
                                </code>

                            </li>
                        </ol>

                        <p class="lastLine">
                            <code>NOTE: The installation process must be redone whenever a new theme is published</code>
                        </p>

                        <div class="lastInst">
                            <p>
                                To uninstall, simply remove the code snippet inserted into the theme. Removing or leaving the assets which were uploaded during installation will make no adverse effect on the site.
                            </p>
                        </div>
                    </Card>
                    <br />
                </div>
            </div>
        );
    }
}
export default Installation;