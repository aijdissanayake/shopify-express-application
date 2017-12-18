import React, {Component} from 'react';
import {Card,DisplayText,Button} from '@shopify/polaris';
import './install.css';

class Installation extends Component{
    render(){
        var liStyle={
            marginTop:'2%'
        }

        var lastIntPara={
            marginBottom:'2%'
        }

        return(            
            <div>
                <div class="InstallTitle">
                    <DisplayText size="medium">Installation Instructions</DisplayText>                    
                </div>
                <div class="InstallVideo">
                    <iframe width="560" height="415" src="https://www.youtube.com/embed/6MaOPdQPvow" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
                </div>
                <div class="InstallDescription">
                    <Card>
                        <ol>
                            <li style={liStyle}>
                                From the Shopify Admin panel, click on <a href="#">"Online Store"</a> 
                            </li>
                            <li>
                                Click on the <code>Actions</code> dropdown button for the current published theme and select <code>Edit HTML/CSS</code>.                        
                            </li>
                            <li>
                                Under the <code>Templates</code>  folder, locate and click on <code>cart.liquid</code> to open it for editing.
                                (for sectioned themes, look in the <code>Sections</code> folder, for <code>cart-template.liquid</code> instead) 
                            </li>
                            <li>
                                Locate the closing tag of the cart form 
                                <code>
                                    {/* </form>     */}
                                </code>
                            </li>
                            <li>
                                Insert the following liquid code snippet
                                <code> 
                                    {/* {% include 'deliverydate' %}  */}
                                </code>
                                just before the cart form closing tag 
                            </li>
                            <li>
                                Save your changes
                            </li>
                        </ol>

                        <p class="lastLine">
                            <code>NOTE: The installation process must be redone whenever a new theme is published</code>
                        </p>

                        <div class="lastInst">
                            <p>
                                To uninstall, simply remove the code snippet inserted into the theme.
                            </p>
                            <p style={lastIntPara}>
                                NOTE: Leaving the snippet in place after uninstallation, will have no adverse effect on the site
                            </p>
                        </div>

                        {/* <button class="AssistanceBtn" size="lg">
                            Request Installation Assistance
                        </button>{' '} */}
                        <Button class="AssistanceBtn" primary>Request Installation Assistance</Button>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Installation;