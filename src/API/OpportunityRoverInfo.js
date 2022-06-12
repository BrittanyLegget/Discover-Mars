import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Button from "react-bootstrap/Button";
import RoverDiagramModal from "../Components/RoverDiagramModal";

/** Mars Rover Photo API Docs - https://github.com/chrisccerami/mars-photo-api
 *
 *     Rover Info available here: https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/?api_key=DEMO_KEY
 *     Returns: Rovers Array of Rover Objects {id, name, landing_date, launch_date, status, max_sol, max_date, total_photos}
 *
 **/

function OpportunityInfo() {
  const [info, setInfo] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const currentRover = "opportunity";
  const diagram = "/opportunity_diagram.png";

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    // Fetch Opportunity Info
    async function fetchOpportunityInfo() {
      let responseBody = {};

      let requestString = process.env.REACT_APP_URL + "/rover/" + currentRover;

      try {
        const res = await fetch(requestString, { signal: controller.signal });
        responseBody = await res.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("HTTP request aborted");
        } else {
          console.log(e);
        }
      }

      if (!ignore) {
        setInfo(responseBody.rover);
      }
    }
    if (!info) {
      fetchOpportunityInfo();
    }

    return () => {
      controller.abort();
      ignore = true;
    };
  }, [info]);

  return (
    <div className="column">
      <div style={{ marginTop: "-50px" }}>
        <img
          src={"/opportunity.png"}
          alt={"Opportunity Rover"}
          style={{ float: "right", marginLeft: "20px" }}
          width="35%"
        />
        <h1 className="pers-info-detail-title">More Rover Details</h1>
      </div>
      {info ? (
        <ul>
          <li className="pers-info-detail-facts">
            <strong className="pers-info-detail-facts">Name:</strong>{" "}
            {info.name}
          </li>
          <li className="pers-info-detail-facts">
            <strong className="pers-info-detail-facts">Launch Date:</strong>{" "}
            {info.launch_date}
          </li>
          <li className="pers-info-detail-facts">
            <strong className="pers-info-detail-facts">Landing Date:</strong>{" "}
            {info.landing_date}
          </li>
          <li className="pers-info-detail-facts">
            <strong className="pers-info-detail-facts">Mission Status:</strong>{" "}
            {info.status}
          </li>
          <li className="pers-info-detail-facts">
            <strong className="pers-info-detail-facts">Max Earth Date:</strong>{" "}
            {info.max_date}
          </li>
          <li className="pers-info-detail-facts">
            <strong className="pers-info-detail-facts">Max Sol:</strong>{" "}
            {info.max_sol}
          </li>
          <li className="pers-info-detail-facts">
            <strong className="pers-info-detail-facts">Total Photos:</strong>{" "}
            {info.total_photos}
          </li>
        </ul>
      ) : (
        <p />
      )}
      <Button
        style={{
          float: "right",
          backgroundColor: "#000",
          borderColor: "#CC6A4F",
          fontFamily: "Titillium Web",
          color: "#CC6A4F",
          marginTop: "-20px",
        }}
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        View Rover Diagram
      </Button>

      <RoverDiagramModal
        diagram={diagram}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <hr />

      <h2 className="pers-info-detail-title">Mission Summary</h2>
      <p className="pers-info-paragraph">
        Opportunity, Mars Exploration Rover (MER-B), launched on July 7, 2003
        and landed on Mars January 25, 2004. The Opportunity mission is
        considered one of NASA's most successful ventures, surpassing the
        previous records for longevity (15 Earth years or 8 Martian years) and
        covering 45.16 km (28.06 mi). The rover sent its last status on 10 June
        2018 when a global 2018 Mars dust storm blocked the sunlight needed to
        recharge its batteries. After hundreds of attempts to reactivate the
        rover, NASA declared the mission complete on February 13, 2019.
      </p>
      <hr />
    </div>
  );
}

export default OpportunityInfo;
