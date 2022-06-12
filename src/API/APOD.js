import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Spinner from "../Components/Spinner";
import "../App.css";
/**   Astronomy Picture of the Day - https://github.com/nasa/apod-api
 *
 *     Returns: APOD Object {copyright,date,explanation,hdulr,media_type,service_version,title,url}
 *  */

function APOD() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [apod, setApod] = useState();

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    // Fetch APOD
    async function fetchAPOD() {
      let responseBody = {};
      setIsLoading(true);
      setIsError(false);

      let requestString = process.env.REACT_APP_URL + "/apod";
      try {
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
        setApod(responseBody);
        setIsLoading(false);
      }
    }
    if (!apod) {
      fetchAPOD();
    }

    return () => {
      controller.abort();
      ignore = true;
    };
  }, [apod]);

  // Helper function to format data
  function FormatAPOD() {
    // No video to embedd, only image
    function onlyImage() {
      return (
        <Container>
          <Image src={apod.hdurl} className="apod-img" alt="" fluid></Image>
        </Container>
      );
    }

    function video() {
      return (
        <>
          <iframe
            src={apod.url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            className="apod-img"
          />
        </>
      );
    }
    return <>{apod.media_type === "video" ? video() : onlyImage()}</>;
  }

  function APODInfo() {
    return (
      <>
        <h1 className="apod-info-title">{apod.title}</h1>
        <br></br>
        <p className="apod-info-paragraph">{apod.explanation}</p>
        <h2 className="apod-info-credit">
          {apod.copyright}&nbsp;&nbsp;&nbsp;&nbsp;{apod.date}
        </h2>
      </>
    );
  }
  return (
    <div className={isLoading ? "page-background-loading" : "page-background"}>
      <Container fluid>
        <Row>
          <Col>
            <h1 className="apod-title">Astronomy Picture of the Day</h1>
            {isError && <p>Error fetching APOD</p>}
            <div>
              {isLoading ? <Spinner /> : <>{apod ? <FormatAPOD /> : <></>} </>}
            </div>
          </Col>
          <Col>{apod ? <APODInfo /> : <></>}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default APOD;
