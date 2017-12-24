import React, {Component} from 'react';
import TraciLogo from '../assets/tracified_logo.jpg';

class TracifiedLogo extends Component{
    render(){
        var logoStyle={
            height: '250px'             
        }

        var backStyle={
            backgroundColor:"black",
            textAlign: 'center',
        }

        return(
            <div style={backStyle}>
                <img src={TraciLogo} style={logoStyle}/>
            </div>
        );
    }
}

export default TracifiedLogo;