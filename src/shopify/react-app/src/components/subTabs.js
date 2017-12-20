import React, { Component } from 'react';
import {Tabs} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Mapping from './ProductMappingModule/ProductMapping';
import Part2Cards from './part2_cards';
import FulfilledOrders from './FulfilledOrders';

class SubTabs extends Component {
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      selectedTab: 0,
    };
  }

  handleTabChange(selectedTab) {
    this.setState({selectedTab});
  }

  render() {
    const {selectedTab} = this.state;

    const tabs = [
      {
        id: 'tab1',
        title: 'Unfulfilled Orders',
        panelID: 'panel2',
      },
      {
        id: 'tab2',
        title: 'Fulfilled Orders',
        panelID: 'panel2',
      },
    ];

    const tabPanels = [
      (
        <Tabs.Panel id="panel1">
          <Part2Cards/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="panel2">
        fullfilled orders view after the OTP is finalized
        </Tabs.Panel>
      )
    ];

    return (
      <div>
        <Tabs
          fitted
          selected={selectedTab}
          tabs={tabs}
          onSelect={this.handleTabChange}
        />
        {tabPanels[selectedTab]}
      </div>
    );
  }
}

export default SubTabs;