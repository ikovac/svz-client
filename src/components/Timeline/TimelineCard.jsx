import React from "react";

import { VerticalTimelineElement } from "react-vertical-timeline-component";

const TimelineCard = ({ step, title, text, imgSource }) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      // date="2011 - present"
      iconStyle={{ background: "rgb(255, 255, 255)", color: "#fff" }}
      // icon={<WorkIcon />}
    >
      <p>{text}</p>
    </VerticalTimelineElement>
  );
};

export default TimelineCard;
