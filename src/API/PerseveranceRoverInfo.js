import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/** Mars Rover Photo API Docs - https://github.com/chrisccerami/mars-photo-api
 *
 *     Params: API KEY (selected options)
 *     Rover Info available here: https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/?api_key=DEMO_KEY
 *     Returns: Rovers Array of Rover Objects {id, name, landing_date, launch_date, status, max_sol, max_date, total_photos}
 *
 **/

function PerseveranceInfo() {
  const api_key = (process.env.REACT_APP_NASA);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState();
  const [isEmpty, setIsEmpty] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    // Fetch Perseverance Info
    async function fetchPerseveranceInfo() {
      let responseBody = {};
      setIsLoading(true);
      setIsError(false);

      let requestString =
        "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/?api_key=" +
        api_key;

      try {
        // Same structure as taught in class
        const res = await fetch(requestString, { signal: controller.signal });
        responseBody = await res.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("HTTP request aborted");
        } else {
          setIsError(true);
          console.log(e);
        }
      }

      if (!ignore) {
        setInfo(responseBody.rover);
        {
          responseBody.rover.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
        }
        console.log("setting info", responseBody.rover);
        setIsLoading(false);
      }
    }
    if (!info) {
      fetchPerseveranceInfo();
    }

    return () => {
      controller.abort();
      ignore = true;
    };
  }, [info]);

  // Rover Diagram Modal
  function RoverDiagramModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontFamily: "Titillium Web" }}
          >
            Rover Equipment Diagram
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src="https://mars.nasa.gov//imgs/2017/10/mars_2020_cameras_labeled_web-full2.jpg"
            alt=""
            width="600"
            class="center"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.onHide}
            style={{
              backgroundColor: "#000",
              borderColor: "#CC6A4F",
              fontFamily: "Titillium Web",
              color: "#CC6A4F",
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="column">
      <div style={{ marginTop: "-50px" }}>
        <img
          src={"/perseverance.png"}
          alt={"Perseverance Rover"}
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

      <RoverDiagramModal show={modalShow} onHide={() => setModalShow(false)} />
      <hr />

      <h2 className="pers-info-detail-title">Mission Summary</h2>
      <p className="pers-info-paragraph">
        Perseverance, nicknamed Percy, is a car-sized Mars rover designed to
        explore the crater Jezero on Mars as part of NASA's Mars 2020 mission.
        Perseverance is based on the successful Curiosity design. Launched with
        the Mars 2020 mission on July 30, 2020, it landed on February 18, 2021.
        It carries the Mars Helicopter Ingenuity attached to its belly. The
        rover's goals include identifying ancient Martian environments capable
        of supporting life, seeking out evidence of former microbial life
        existing in those environments, collecting rock and soil samples to
        store on the Martian surface, and testing oxygen production from the
        Martian atmosphere to prepare for future crewed missions.
      </p>
      <hr />
    </div>
  );
}

export default PerseveranceInfo;
