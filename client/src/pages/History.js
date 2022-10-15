import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes";

import { useLaunches } from "../hooks/useLaunches";

const History = props => {
  const {
    launches, 
    deleteLaunch,
    restoreLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return props.launches?.filter((launch) => !launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <span onClick={() => {console.log('before check abortLaunch Id#' + launch.flightNumber); restoreLaunch(launch.flightNumber); console.log('after check abortLaunch')}} style={{cursor: "pointer", color: launch.success ? "greenyellow" : "red"}
            }>✔</span>
            <span onClick={() => deleteLaunch(launch.flightNumber)} style={{cursor: "pointer", color: launch.success ? "greenyellow" : "red"}
            }>✖</span>            
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(", ")}</td>
        </tr>;
      });
  }, [launches]);


  return <article id="history">
    <Appear animate show={props.entered}>
      <Paragraph>History of mission launches including SpaceX launches starting from the year 2006.</Paragraph>
      <Table animate>
        <table style={{tableLayout: "fixed"}}>
          <thead>
            <tr>
              <th style={{width: "2rem"}}></th>
              <th style={{width: "3rem"}}>No.</th>
              <th style={{width: "9rem"}}>Date</th>
              <th>Mission</th>
              <th style={{width: "7rem"}}>Rocket</th>
              <th>Customers</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </Table>
    </Appear>
  </article>;
}
  
export default History;