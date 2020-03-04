import React from "react";

const LaunchItem = props => {
  return (
    <div className="card card-body mb-3">
      <h6>{props.launch.mission_name}</h6>
      <p>
        {props.launch.launch_year}&nbsp;{props.launch.flight_number}
      </p>
    </div>
  );
};

export default LaunchItem;
