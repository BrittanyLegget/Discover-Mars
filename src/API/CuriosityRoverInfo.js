import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Button from "react-bootstrap/Button";
import RoverDiagramModal from "../Components/RoverDiagramModal";

/** Mars Rover Photo API Docs - https://github.com/chrisccerami/mars-photo-api
 *
 *     Rover Info available here: https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=DEMO_KEY
 *     Returns: Rovers Array of Rover Objects {id, name, landing_date, launch_date, status, max_sol, max_date, total_photos}
 *
 **/

function CuriosityInfo() {
  const [info, setInfo] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const currentRover = "curiosity";
  const diagram = "/curiosity_diagram.png";

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    // Fetch Curiosity Info
    async function fetchCuriosityInfo() {
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
      fetchCuriosityInfo();
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
          src={"/curiosity.png"}
          alt={"Curiosity Rover"}
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
        Curiosity is a car-sized Mars rover designed to explore the Gale crater
        on Mars as part of NASA's Mars Science Laboratory (MSL) mission. The
        rover was launched November 26, 2011 and landed at the Aeolis Palus
        plain near Aeolis Mons (aka "Mount Sharp") in Gale Crater on August 6,
        2012. The rover's goals include an investigation of the Martian climate
        and geology, assessment of whether the selected field site inside Gale
        has ever offered environmental conditions favorable for microbial life
        (including investigation of the role of water), and planetary
        habitability studies in preparation for human exploration. The Curiosity
        rover is still operational as of March 2021.
      </p>
      <hr />
    </div>
  );
}

export default CuriosityInfo;
