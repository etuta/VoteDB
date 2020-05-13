import React, { useState, useEffect } from "react";
// eslint-disable-next-line
// import data from "./seed.json";
import Geocode from "react-geocode";
import "./App.css";
//import styled from "styled-components";
import { MDBCol } from "mdbreact";
import { List } from "immutable";
import { headerStyle, introStyle, filterStyle } from "./components/UIDesign.js";
import SearchBar from "./components/SearchBar.js";
import EmailBar from "./components/EmailBar.js";
import MapBar from "./components/MapBar.js";
import Modal from "./components/Modal.js";

import {
  Container,
  Row,
  Col,
  ListGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

Geocode.setLanguage("en");
Geocode.setApiKey("AIzaSyCUoSNNknN6UL2JS_BK_MUC79gp4M6eq4g");
//Private API Key

//const Button = styled.button``;

const App = () => {
  // eslint-disable-next-line
  const [target, setTarget] = useState(null);
  // const [dropdownOpen, setOpen] = useState(false);
  const [mapCollection, setMapCollection] = useState([]);
  const [currentDropdown, setCurrentDropdown] = useState("");
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [modal, setModal] = useState(false);

  const [partyFilter, setPartyFilter] = useState(null);
  const [registrationFilter, setRegistrationFilter] = useState(null);
  const [ageRangeFilter, setAgeRangeFilter] = useState({});
  const [raceFilter, setRaceFilter] = useState(null);
  const [socioeconomicFilter, setSocioeconomicFilter] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/voters/")
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then(data => {
          setVoters(List(data));
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("voters: ", voters);
    const filtVoters = voters
      .filter(voter => (partyFilter ? voter.party === partyFilter : true))
      .filter(voter =>
        registrationFilter !== null
          ? voter.regstration_status === registrationFilter
          : true
      )
      .filter(voter => {
        if (!ageRangeFilter.max) return true;
        const age = parseInt(voter.age_range);

        return age >= ageRangeFilter.min && age <= ageRangeFilter.max;
      })

      .filter(voter => (raceFilter ? voter.race === raceFilter : true))
      .filter(voter =>
        socioeconomicFilter
          ? voter.socioeconomic_status === socioeconomicFilter
          : true
      );
    console.log("filtVoters: ", filtVoters);
    setFilteredVoters(filtVoters);
  }, [
    partyFilter,
    registrationFilter,
    ageRangeFilter,
    raceFilter,
    socioeconomicFilter,
    voters
  ]);

  // console.log("filteredVoters: ", filteredVoters);

  //Default: overview of North America
  const [latitude, setLatitude] = useState(54.526);
  const [longitude, setLongitude] = useState(-105.2551);
  const [zoom, setZoom] = useState(3);
  // eslint-disable-next-line
  const toggle = dropdown => setCurrentDropdown(dropdown);

  // eslint-disable-next-line
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("view");

  //  const target = useRef(null);
  //const ref = useRef(null);

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleMapClick = click => {
    //User can choose any five points on the map
    if (mapCollection.length <= 4) {
      const updatedMapCollection = mapCollection;
      updatedMapCollection.push([click.latlng.lat, click.latlng.lng]);
      setMapCollection(updatedMapCollection);
    } else {
      alert("5 points already chosen");
    }
  };

  const changeLocation = input => {
    Geocode.fromAddress(input).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        setZoom(20);
      },
      error => {
        alert(
          "I'm sorry, I was not able to complete your request at this time"
        );
        console.error("Please enter valid address and/or name");
      }
    );
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  return (
    <Container>
      <div className="App">
        <div className="wallpaper">
          <h1 style={headerStyle}>Voter App</h1>
          <h5 style={introStyle}> Every vote counts </h5>
          <>
            <div className="searchField">
              <Row>
                <SearchBar select={input => changeLocation(input)} />
                <button
                  className="button"
                  onClick={() => {
                    setMode("filter");
                    handleModalOpen();
                  }}
                  margin-left="400px"
                  variant="Search by Filters:"
                >
                  {" "}
                  Search by Filters{" "}
                </button>{" "}
                <Modal show={modal} handleClose={e => handleModalClose(e)}>
                  // <h3 style={filterStyle}>Select Filters</h3>
                </Modal>
              </Row>
            </div>
            <p></p>
          </>
          <p></p>
          <Row>
            <MDBCol md="8"></MDBCol>
            <div>
              {filteredVoters.map(({ id, name }) => (
                <p key={id}>{name}</p>
              ))}
            </div>
          </Row>
          <Row>
            <MapBar
              latitude={latitude}
              longitude={longitude}
              zoom={zoom}
              select={click => handleMapClick(click)}
            />

            <div className="emailBar">
              <EmailBar />
            </div>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default App;
