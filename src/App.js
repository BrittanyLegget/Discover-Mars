import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import APOD from "./API/APOD.js";
import Home from "./Home.js";
import Perseverance from "./API/Perseverance";
import Spirit from "./API/Spirit";
import Opportunity from "./API/Opportunity";
import Curiosity from "./API/Curiosity";
import Footer from "./Footer";
import NavBar from "./Components/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/Rover/Perseverance">
          <Perseverance />
          <Footer />
        </Route>
        <Route path="/Rover/Curiosity">
          <Curiosity />
          <Footer />
        </Route>
        <Route path="/Rover/Opportunity">
          <Opportunity />
          <Footer />
        </Route>
        <Route path="/Rover/Spirit">
          <Spirit />
          <Footer />
        </Route>
        <Route path="/Apod">
          <APOD />
          <Footer />
        </Route>
        <Route path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <h1>404</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
