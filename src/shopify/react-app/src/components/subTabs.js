import React, { Component } from 'react';
import {Tabs} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Mapping from './ProductMappingModule/ProductMapping';
import Part2Cards from './part2_cards';

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
        title: 'Fulfilled Order Details',
        panelID: 'panel2',
      },
      {
        id: 'tab2',
        title: 'Unfulfilled Order Details',
        panelID: 'panel2',
      },
    ];

    const tabPanels = [
      (
        <Tabs.Panel id="panel1">
          <Mapping/>
          <Part2Cards/>
        </Tabs.Panel>
      ),
      (
        <Tabs.Panel id="panel2">
        
        </Tabs.Panel>
      )
    ];

    return (
      <div>
        <Tabs
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