import React from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const PaketiTabs = ({ label, items }) => {
  return (
    <Tabs
      selectedTabClassName="is-active"
      selectedTabPanelClassName="is-active"
    >
      <TabList className="tabs">
        {items.map((item, index) => (
          <Tab key={index} className="tabs-title">
            {label} {index + 1}
          </Tab>
        ))}
      </TabList>
      <div className="tabs-content">
        {items.map((item, index) => (
          <TabPanel key={index} className="tabs-panel">
            <div
              dangerouslySetInnerHTML={{ __html: item.field_paket.processed }}
            />
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default PaketiTabs;
