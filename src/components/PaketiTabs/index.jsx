import React from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";

const PaketiTabs = ({ label, items }) => {
  return (
    <Tabs>
      <TabList>
        {items.map((item, index) => (
          <Tab key={index}>
            {label} {index + 1}
          </Tab>
        ))}
      </TabList>

      {items.map((item, index) => (
        <TabPanel key={index}>
          <div
            dangerouslySetInnerHTML={{ __html: item.field_paket.processed }}
          />
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default PaketiTabs;
