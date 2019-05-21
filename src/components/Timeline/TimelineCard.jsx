import React from "react";
import Image from "../Image";

import { VerticalTimelineElement } from "react-vertical-timeline-component";

const TimelineCard = ({ step, title, text, imgSource }) => {
  return (
    <VerticalTimelineElement
      // className="vertical-timeline-element--work"
      // date="2011 - present"
      iconStyle={{ background: "rgb(255, 255, 255)", color: "#fff" }}
      // icon={<WorkIcon />}
    >
      <div className="timeline-card__header">
        <div className="timeline-card__header-number">
          <span>{"0" + step}</span>
        </div>
        <h3>{title}</h3>
      </div>
      <div className="timeline-card__body">
        <div
          className="timeline-card__body-text"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {imgSource && <Image source={imgSource} alt={title} />}
      </div>
    </VerticalTimelineElement>
  );
};

export default TimelineCard;
