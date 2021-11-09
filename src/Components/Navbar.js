import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="xl">
      <Nav>
        <NavLink
          to="/home"
          className="navbar nav-item nav-link active"
          activeClassName="selected"
        >
          Home
        </NavLink>
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      <Nav className="justify-content-end">
        <NavLink
          to="/Apod"
          className="navbar nav-item nav-link"
          activeClassName="selected"
        >
          APOD
        </NavLink>
        <NavLink
          to="/Rover/Perseverance"
          className="navbar nav-item nav-link"
          activeClassName="selected"
        >
          Perseverance
        </NavLink>
        <NavLink
          to="/Rover/Curiosity"
          className="navbar nav-item nav-link"
          activeClassName="selected"
        >
          Curiosity
        </NavLink>
        <NavLink
          to="/Rover/Opportunity"
          className="navbar nav-item nav-link"
          activeClassName="selected"
        >
          Opportunity
        </NavLink>
        <NavLink
          to="/Rover/Spirit"
          className="navbar nav-item nav-link"
          activeClassName="selected"
        >
          Spirit
        </NavLink>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
