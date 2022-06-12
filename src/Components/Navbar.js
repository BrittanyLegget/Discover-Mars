import { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

function NavBar() {
  const [isCurrent] = useState(window.location.pathname);
  return (
    <Navbar bg="dark" variant="dark" expand="xl">
      <Container>
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-nav ml-auto"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav ml-auto" activeKey={isCurrent}>
            <Nav.Link href="/Apod" eventKey="/Apod">
              APOD
            </Nav.Link>
            <Nav.Link href="/Rover/Perseverance" eventKey="/Rover/Perseverance">
              Perseverance
            </Nav.Link>
            <Nav.Link href="/Rover/Curiosity" eventKey="/Rover/Curiosity">
              Curiosity
            </Nav.Link>
            <Nav.Link href="/Rover/Opportunity" eventKey="/Rover/Opportunity">
              Opportunity
            </Nav.Link>
            <Nav.Link href="/Rover/Spirit" eventKey="/Rover/Spirit">
              Spirit
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
