import React, { useState, useEffect, useRef } from "react";
import data from "./seed.json";
import Geocode from "react-geocode";
import "./App.css";
import styled from "styled-components";
import { MDBCol, MDBInput } from "mdbreact";
import { List } from "immutable";
import { headerStyle, introStyle, filterStyle } from "./components/UIDesign";
import SearchBar from "./components/SearchBar";
import EmailBar from "./components/EmailBar";
import MapBar from "./components/MapBar";
import Modal from "./components/Modal";
import VotersFilters from "./components/VotersFilters";
import VotersList from "./components/VotersList";
import { get } from './api/httpclient';

import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

Geocode.setLanguage("en");
Geocode.setApiKey("AIzaSyCUoSNNknN6UL2JS_BK_MUC79gp4M6eq4g");
//Private API Key

const Button = styled.button``;

const App = () => {
  const [target, setTarget] = useState(null);
  const [dropdownOpen, setOpen] = useState(false);
  const [mapCollection, setMapCollection] = useState([]);
  // const [currentDropdown, setCurrentDropdown] = useState("");
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("view");

  // const [partyFilter, setPartyFilter] = useState(null);
  // const [registrationFilter, setRegistrationFilter] = useState(null);
  // const [ageRangeFilter, setAgeRangeFilter] = useState({});
  // const [raceFilter, setRaceFilter] = useState(null);
  // const [socioeconomicFilter, setSocioeconomicFilter] = useState(null);

  useEffect(() => {
    (()=> {
      get("/api/voters/")
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
    })()
  }, []);
  

  // useEffect(() => {
  //   console.log("voters: ", voters);
  //   const filtVoters = voters
  //     .filter(voter => (partyFilter ? voter.party === partyFilter : true))
  //     .filter(voter =>
  //       registrationFilter !== null
  //         ? voter.regstration_status === registrationFilter
  //         : true
  //     )
  //     .filter(voter => {
  //       if (!ageRangeFilter.max) return true;
  //       const age = parseInt(voter.age_range);

  //       return age >= ageRangeFilter.min && age <= ageRangeFilter.max;
  //     })

  //     .filter(voter => (raceFilter ? voter.race === raceFilter : true))
  //     .filter(voter =>
  //       socioeconomicFilter
  //         ? voter.socioeconomic_status === socioeconomicFilter
  //         : true
  //     );
  //   console.log("filtVoters: ", filtVoters);
  //   setFilteredVoters(filtVoters);
  // }, [
  //   partyFilter,
  //   registrationFilter,
  //   ageRangeFilter,
  //   raceFilter,
  //   socioeconomicFilter
  // ]);

  //console.log("filteredVoters: ", filteredVoters);

  //Default: overview of North America
  const [latitude, setLatitude] = useState(54.526);
  const [longitude, setLongitude] = useState(-105.2551);
  const [zoom, setZoom] = useState(3);

  //  const target = useRef(null);
  // TODO: not used
  const ref = useRef(null);

  // TODO: not used
  // const handleClick = event => {
  //   setShow(!show);
  //   setTarget(event.target);
  // };

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
        setZoom(12);
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
              Filter Voters
            </button>
          </Row>
          <>
            <Modal show={modal} handleClose={e => handleModalClose(e)}>
              {mode === "filter" && (
                <VotersFilters 
                  voters={filteredVoters.length ? filteredVoters : voters }
                  setFilteredVoters={setFilteredVoters} />
              )}
              <div className="voters-list-container" style={{background: 'beige'}}>
                <h2>Voters</h2>
                <VotersList voters={filteredVoters} />
              </div>
            </Modal>
          </>
          <Row>
            <MDBCol md="8">
            </MDBCol>
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
