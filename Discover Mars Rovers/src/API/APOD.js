import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Spinner from "../Components/Spinner";

/**   Astronomy Picture of the Day - https://github.com/nasa/apod-api
 *
 *     Params: API KEY
 *     Returns: APOD Object {copyright,date,explanation,hdulr,media_type,service_version,title,url}
 *
 *
 *     Possible modifications:
 *        entry field for date(YYYY-MM_DD) to get APOD for that day.
 *        input count to get random # of images. Put in a grid?
 *
 *
 *     Not sure how this reacts to video url but could add in protection to just add in video thumbnail and link to video if needed.
 *  */
function APOD() {
  const key = (process.env.REACT_APP_NASA);
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

      let requestString =
        "https://api.nasa.gov/planetary/apod?api_key=" + key; // Build query, can add params to extend features
      //console.log(requestString);                                               //Test date for panoramic &date=2021-03-09, Perseverance landing: &date=2021-02-23  &date=2021-03-15 youtube video
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
        setApod(responseBody);
        setIsLoading(false);
      }
    }
    //console.log("APOD",apod);
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
    console.log(apod);
    let mediaType = apod.media_type;
    // No video to embedd, only image
    function onlyImage() {
      return (
        <>
          <Image src={apod.hdurl} className="apod-img" alt="" fluid></Image>
        </>
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
    <div className="page-background">
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
