import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import CuriosityInfo from "./CuriosityRoverInfo";
import Spinner from "../Components/Spinner";
//Import bootstrap components
import Carousel from "react-bootstrap/Carousel";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import date picker
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

// MUI theme for date picker
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(128,128,128)",
    },
  },
  typography: {
    fontFamily: ["Titillium Web"].join(","),
  },

  overrides: {
    // MuiPickersToolbar: {
    //   toolbar: {
    //     backgroundColor: '#CC6A4F',
    //   },
    // },
    MuiPickersDay: {
      day: {
        color: "#000",
      },
      daySelected: {
        backgroundColor: "#CC6A4F",
      },
      dayDisabled: {
        color: "#D3D3D3",
      },
    },
    // MuiFormControl: {
    //   root: {
    //     color: 'rgb(128,128,128)'
    //   }
    // },
    MuiInputBase: {
      input: {
        color: "#CC6A4F",
      },
    },
  },
});
/** Mars Rover Photo API Docs - https://github.com/chrisccerami/mars-photo-api
 *
 *     Params: API KEY (selected options)
 *     Photos by camera / sol available here : https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&earth_date=<date>
 *     Returns: Photos Array of Photo Objects: {id, sol, camera, img_src, earth_date, rover}
 *
 **/

function Curiosity() {
  const api_key = "";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();
  const [isEmpty, setIsEmpty] = useState(true);
  const [date, setDate] = useState("2012-08-27");
  const [camera, setCamera] = useState("");
  const placeholderImage = "/Curiosity_diagram.png";

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    // Fetch Curiosity Data
    async function fetchCuriosity() {
      let responseBody = {};
      setIsLoading(true);
      setIsError(false);

      let requestString =
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" +
        date +
        "&camera=" +
        camera +
        "&api_key=" +
        api_key; // Build query, can add params to extend features

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
        setData(responseBody.photos);
        {
          responseBody.photos.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
        }
        console.log("setting data", responseBody.photos);
        setIsLoading(false);
      }
    }
    if (!data) {
      fetchCuriosity();
    }

    return () => {
      controller.abort();
      ignore = true;
      fetchCuriosity();
    };
  }, [camera, date]);

  //Handle the dropdown camera selection
  function handleSelect(event) {
    setCamera(event);
    console.log(event);
    setData();
  }
  //Create dropdown selection for cameras
  function DropDown() {
    return (
      <>
        <div style={{ paddingTop: "20px", marginBottom: "-10px" }}>
          <h1 className="pers-info-detail-title">Rover Cameras</h1>
          <p className="pers-info-paragraph">
            The Curiosity Rover has 7 cameras to choose from:{" "}
          </p>
        </div>
        <div>
          <Dropdown as={ButtonGroup} onSelect={handleSelect}>
            <Button
              variant="success"
              style={{
                backgroundColor: "#000",
                borderColor: "#CC6A4F",
                fontFamily: "Titillium Web",
                color: "#CC6A4F",
              }}
            >
              Select Camera
            </Button>

            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown"
              style={{ backgroundColor: "#CC6A4F", borderColor: "#CC6A4F" }}
            />

            <Dropdown.Menu>
              <Dropdown.Item eventKey="FHAZ">
                Front Hazard Avoidance Camera
              </Dropdown.Item>
              <Dropdown.Item eventKey="NAVCAM">Navigation Camera</Dropdown.Item>
              <Dropdown.Item eventKey="MAST">Mast Camera</Dropdown.Item>
              <Dropdown.Item eventKey="CHEMCAM">
                Chemistry and Camera Complex
              </Dropdown.Item>
              <Dropdown.Item eventKey="MAHLI">
                Mars Hand Lens Imager
              </Dropdown.Item>
              <Dropdown.Item eventKey="MARDI">
                Mars Descent Imager
              </Dropdown.Item>
              <Dropdown.Item eventKey="RHAZ">
                Rear Hazard Avoidance Camera
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </>
    );
  }
  //Set date state to value selected from date picker in the correct date format
  function handleDateChange(event) {
    setData();
    const selection = moment(event).format("YYYY-MM-D");
    setDate(selection);
  }

  //Calendar Date Picker
  function DateSelector() {
    return (
      <ThemeProvider theme={muiTheme}>
        <DatePicker
          autoOk
          animateYearScrolling
          disableFuture
          minDate="2012-08-27"
          openTo="date"
          value={date}
          onChange={handleDateChange}
        />
      </ThemeProvider>
    );
  }

  // Helper function to Format images
  function FormatImages() {
    return (
      <>
        <Container fluid>
          <h1 className="pers-title">Curiosity Rover Data</h1>
          <Row>
            {isEmpty && camera ? ( //If image array is empty and a camera had been selected then there are no images for that camera on that day
              <Col>
                <h5 className="pers-title">
                  Sorry, I dont have any images for this camera on this date
                </h5>
              </Col>
            ) : (
              <>
                {camera ? ( //If the user has not selected the camera yet, show default image, else show camera images
                  <Col>
                    <Carousel className="carousel w-90">
                      {data.map((p) => (
                        <Carousel.Item interval={5000} key={p.id}>
                          <img
                            className="d-block w-100"
                            src={p.img_src}
                            alt=""
                          />
                          <Carousel.Caption
                            style={{ top: "0", opacity: "0.5" }}
                          >
                            <div style={{ backgroundColor: "black" }}>
                              <h5>{p.earth_date}</h5>
                              <p>{p.camera.full_name}</p>
                            </div>
                          </Carousel.Caption>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    <br />
                  </Col>
                ) : (
                  <Col>
                    <img src={placeholderImage} width="100%" alt="" />
                    <h5 className="pers-title">
                      Select a camera to view images
                    </h5>
                  </Col>
                )}
              </>
            )}
          </Row>
        </Container>
      </>
    );
  }
  return (
    <div className="page-background">
      <Container fluid>
        <Row xs={1} md={2}>
          <Col>
            {isError && <p>Error fetching Curiosity images</p>}
            {isLoading ? <Spinner /> : <>{data ? <FormatImages /> : <></>} </>}
          </Col>
          <Col>
            <Row className="mb-5">
              <DropDown />
              <div className="ml-5">
                <DateSelector />
              </div>
            </Row>
            <CuriosityInfo />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Curiosity;
