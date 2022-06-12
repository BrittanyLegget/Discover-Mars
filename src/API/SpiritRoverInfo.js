import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Button from "react-bootstrap/Button";
import RoverDiagramModal from "../Components/RoverDiagramModal";
import { Container } from "react-bootstrap";

/** Mars Rover Photo API Docs - https://github.com/chrisccerami/mars-photo-api
 *
 *     Rover Info available here: https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/?api_key=DEMO_KEY
 *     Returns: Rovers Array of Rover Objects {id, name, landing_date, launch_date, status, max_sol, max_date, total_photos}
 *
 **/

function SpiritInfo() {
  const [info, setInfo] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const currentRover = "spirit";
  const diagram = "/spirit_diagram.png";

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    // Fetch Spirit Info
    async function fetchSpiritInfo() {
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
      fetchSpiritInfo();
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
          src={"/spirit.png"}
          alt={"Spirit Rover"}
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
      <Container>
        <RoverDiagramModal
          diagram={diagram}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
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
      </Container>
      <hr />

      <h2 className="pers-info-detail-title">Mission Summary</h2>
      <p className="pers-info-paragraph">
        Spirit Mars Exploration Rover (MER-A), launched on June 10, 2003, and
        landed on Mars January 4, 2004. Nearly 6 years after the original
        mission limit, Spirit had covered a total distance of 7.73 km (4.80 mi)
        but its wheels became trapped in sand. The rover continued in a
        stationary science platform role until communication with Spirit stopped
        (sol 2208). The last communication received from the rover was on March
        22, 2010, and NASA ceased attempts to re-establish communication on May
        25, 2011.
      </p>
      <hr />
    </div>
  );
}

export default SpiritInfo;
