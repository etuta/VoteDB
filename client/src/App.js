/* eslint-disable */

import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import "./App.css";
//import styled from "styled-components";
import { MDBCol } from "mdbreact";
import { List } from "immutable";
import { headerStyle, introStyle } from "./components/UIDesign";
import SearchBar from "./components/SearchBar";
import EmailBar from "./components/EmailBar";
import MapBar from "./components/MapBar";
import Modal from "./components/Modal";
import VotersFilters from "./components/VotersFilters";
import VotersList from "./components/VotersList";
import { get } from "./api/httpclient";

import {
  Container,
  Row
  // Col,
  // ListGroup,
  // ButtonDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";

Geocode.setLanguage("en");
Geocode.setApiKey("AIzaSyCUoSNNknN6UL2JS_BK_MUC79gp4M6eq4g");
//Private API Key

const App = () => {
  // eslint-disable-next-line
  const [target, setTarget] = useState(null);
  // const [dropdownOpen, setOpen] = useState(false);
  const [mapCollection, setMapCollection] = useState([]);
  const [voters, setVoters] = useState(List());
  const [filteredVoters, setFilteredVoters] = useState(List());
  const [modal, setModal] = useState(false);
  // eslint-disable-next-line

  const [mode, setMode] = useState("view");

  // console.log('filteredVoters', filteredVoters.isEmpty());

  const [registrationFilter, setRegistrationFilter] = useState(null);
  const [ageRangeFilter, setAgeRangeFilter] = useState({});
  const [raceFilter, setRaceFilter] = useState("");
  const [socioeconomicFilter, setSocioeconomicFilter] = useState(null);
  const [partyFilter, setPartyFilter] = useState(null);

  useEffect(() => {
    (() => {
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
    })();
  }, []);

  useEffect(() => {
    const filtered = voters
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

      .filter(voter => {
        console.log(voter.name, voter.race);
        return raceFilter ? voter.race === raceFilter : true;
      })
      .filter(voter =>
        socioeconomicFilter
          ? voter.socioeconomic_status === socioeconomicFilter
          : true
      );

    setFilteredVoters(List(filtered));
  }, [
    partyFilter,
    registrationFilter,
    ageRangeFilter,
    raceFilter,
    socioeconomicFilter
  ]);

  //Default: overview of North America
  const [latitude, setLatitude] = useState(54.526);
  const [longitude, setLongitude] = useState(-105.2551);
  const [zoom, setZoom] = useState(3);

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
                Filter Voters
              </button>
            </Row>
            <Modal show={modal} handleClose={e => handleModalClose(e)}>
              <VotersFilters
                registrationFilter={registrationFilter}
                setRegistrationFilter={setRegistrationFilter}
                ageRangeFilter={ageRangeFilter}
                setAgeRangeFilter={setAgeRangeFilter}
                raceFilter={raceFilter}
                setRaceFilter={setRaceFilter}
                socioeconomicFilter={socioeconomicFilter}
                setSocioeconomicFilter={setSocioeconomicFilter}
                partyFilter={partyFilter}
                setPartyFilter={setPartyFilter}
              />
              <div
                className="voters-list-container"
                style={{ background: "beige" }}
              >
                <h2>Voters</h2>
                <VotersList
                  voters={
                    !filteredVoters.isEmpty() ? filteredVoters : filteredVoters
                  }
                />
              </div>
            </Modal>
            <Row>
              <MDBCol md="8"></MDBCol>
              <div>
                {filteredVoters.map(({ id, name }) => (
                  <p key={id}>{name}</p>
                ))}
              </div>
            </Row>
          </div>
          <p></p>
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

/* eslint-enable */
