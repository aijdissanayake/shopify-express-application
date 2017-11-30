import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductMappingService from './ProductMappingService';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {
    Layout,
    Page,
    FooterHelp,
    Card,
    Button,
    FormLayout,
    TextField,
    AccountConnection,
    ChoiceList,
    SettingToggle,
    Stack,
    Badge,
    Heading,
    PageActions,
    Checkbox,
    ResourceList,


} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

class ProductMappingTableRow extends Component {
    constructor(props) {
        super(props);

        this.props.tracelist.forEach(v => console.log(v.id));
        console.log(this.props.tracelist[1].id);
        console.log(this.props.tracelist.length)

        this.productMappingService = new ProductMappingService();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.productMappingService.deleteData(this.props.obj.id);
    }
    render() {
        return (
            <tr>
                <td>
                    <Badge>
                        <Select
                            options={[
                                this.props.obj.title

                            ]}
                            placeholder="Traceability Product IDs"
                        />
                    </Badge>

                </td>
                <td>
                    {this.props.obj.title}
                </td>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    <Select
                        options={

                            this.props.tracelist.forEach(
                                v =>
                                    [v.id]
                            )
                        }
                        placeholder="Traceability Product IDs"
                    />
                </td>
                <td>
                    <Checkbox label="Traceability Enabled " />
                </td>
                <td>
                    <form onSubmit={this.handleSubmit}>

                    </form>
                </td>
            </tr>
        );

    }
}

export default ProductMappingTableRow;