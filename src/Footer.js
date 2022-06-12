import { Card } from "react-bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Footer(props) {
  const [modalShow, setModalShow] = React.useState(false);

  // Give credit where credit is due
  function CreditsModal(props) {
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
            Acknowledgements
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src="https://www.jpl.nasa.gov/edu/images/activities/usingpi/curiosity_roll.gif"
            width="95%"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <br />
          <h2 className="pers-info-detail-title">Developers</h2>
          <p>
            Ths website was initially developed by Brittany Legget, Tanya
            Haddad, and Evan Amaya as a project for Advanced Web Development at
            Oregon State University
            <br />
            Continued development is by Brittany Legget.
          </p>
          <h2 className="pers-info-detail-title">Images</h2>
          <p>Home page image source: NASA/JPL-Caltech</p>
          <h2 className="pers-info-detail-title">NASA APIs</h2>
          <p>
            APOD and Rover data taken from the following specific NASA APIs
            (Public Domain)
          </p>
          <ul>
            <li>
              <a
                href="https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
                target="_blank"
              >
                APOD Endpoint
              </a>
            </li>
            <li>
              <a
                href="https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=DEMO_KEY"
                target="_blank"
              >
                Rover Data Endpoint
              </a>
            </li>
            <li>
              <a
                href="https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?api_key=DEMO_KEY&sol=29&camera=fhaz"
                target="_blank"
              >
                Rover Photos Example
              </a>
            </li>
          </ul>
          <h2 className="pers-info-detail-title">Rover Mission Details</h2>
          <p>Rover mission text details taken from Wikipedia (CC BY-SA)</p>
          <ul>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Mars_rover"
                target="_blank"
              >
                All Rovers
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Perseverance_(rover)"
                target="_blank"
              >
                Perseverance
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Curiosity_(rover)"
                target="_blank"
              >
                Curiosity
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Opportunity_(rover)"
                target="_blank"
              >
                Opportunity
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Spirit_(rover)"
                target="_blank"
              >
                Spirit
              </a>
            </li>
          </ul>

          <h2 className="pers-info-detail-title">Rover Equipment Diagrams</h2>
          <p>
            Rover equipment diagrams taken from NASA press kits (public domain)
          </p>
          <ul>
            <li>
              <a
                href="https://www.jpl.nasa.gov/news/press_kits/mars_2020/assets/images/launch/04_mission/04B_spacecraft/spacecraft-rover-cameras@2x.png"
                target="_blank"
              >
                Perseverance
              </a>
            </li>
            <li>
              <a
                href="https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/images/672640main_malin-4_full.jpg"
                target="_blank"
              >
                Curiosity
              </a>
            </li>
            <li>
              <a
                href="https://planetary.s3.amazonaws.com/web/assets/pictures/_1200x1046_crop_center-center_82_line/113474/mer_diagram.jpg.webp"
                target="_blank"
              >
                Spirit & Opportunity
              </a>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.onHide}
            style={{
              backgroundColor: "#CC6A4F",
              borderColor: "#CC6A4F",
              fontFamily: "Titillium Web",
              color: "#DCDCDC",
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Card
        className="text-center"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          bottom: "0",
          height: "5em",
          backgroundColor: "black",
          fontFamily: "Titillium Web",
          border: "5px",
          borderColor: "black",
        }}
      >
        <Card.Footer
          style={{
            backgroundColor: "#343A40",
            color: "grey",
            position: "fixed",
            width: "100%",
            bottom: "0",
            fontFamily: "Gugi",
          }}
        >
          <a href="https://api.nasa.gov/" target="_blank">
            &#169;NASA API
          </a>

          <a style={{ color: "#007bff" }} onClick={() => setModalShow(true)}>
            &nbsp;&nbsp;&nbsp; Credits
          </a>
        </Card.Footer>
      </Card>
      <CreditsModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Footer;
