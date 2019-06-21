import React from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const PaketiTabs = ({ label, items, title="Paketi" }) => {
  if (!items.length) {
    return null;
  }
  if (!items.filter(item => item.field_paket !== null).length) {
    return null;
  }
  return (
    <>
      <h3>{title}</h3>
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
          {items.map((item, index) =>
            item.field_paket ? (
              <TabPanel key={index} className="tabs-panel">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.field_paket.processed,
                  }}
                />
              </TabPanel>
            ) : null
          )}
        </div>
      </Tabs>
    </>
  );
};

export default PaketiTabs;
