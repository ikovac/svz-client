import React from "react";
import TimelineCard from "./TimelineCard";

import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Timeline = () => {
  return (
    <div className="timeline-wrapper">
      {/* <h1>Timeline Main Title</h1>
      <p>short text description</p> */}
      <VerticalTimeline>
        <TimelineCard
          step={"01"}
          title={"Title"}
          text={"Lorem Ipsum text"}
          imgSource={"http://placehold.it/1000x500"}
        />
        <TimelineCard
          step={"02"}
          title={"Title"}
          text={"Lorem Ipsum text"}
          imgSource={"http://placehold.it/1000x500"}
        />
        <TimelineCard
          step={"03"}
          title={"Title"}
          text={"Lorem Ipsum text"}
          imgSource={"http://placehold.it/1000x500"}
        />
        <TimelineCard
          step={"04"}
          title={"Title"}
          text={"Lorem Ipsum text"}
          imgSource={"http://placehold.it/1000x500"}
        />
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
