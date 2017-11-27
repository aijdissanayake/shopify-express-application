import React, {Component} from 'react';
import ItemService from './ItemService';

class AddItem extends Component {
    
    constructor(props){
        super(props);
        this.state={value:''};

        this.addItemService = new ItemService();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    //handleChange
    handleChange(e){
        this.setState({value:e.target.value});
    }

    //handleSubmit
    handleSubmit(e){
        alert(this.state.value);
        e.preventDefault();
        this.addItemService.sendData(this.state.value);
        this.props.history.push('/');
    }

    render(){
        return (
            <div className="container">
               <form onSubmit={this.handleSubmit}>
                   <label>
                       Add Item:
                       <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control"/>
                   </label><br/>
                   <input type="submit" value="Submit" className="btn-btn-primary"/>
               </form>
            </div>
        );
    }
}

export default AddItem;