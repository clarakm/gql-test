import React, { Component } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LaunchItem from "./LaunchItem.jsx";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_year
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <h4>Loading ...</h4>;
  if (error) console.log(error);
  console.log(data);

  const display = data.launches.map(launch => (
    <LaunchItem key={launch.flight_number} launch={launch} />
  ));

  return (
    <div>
      <h1>Launches</h1>
      {display}
    </div>
  );
};

export default Launches;
