import React, { useState, useEffect, useRef, Component } from "react";
// import data from "./seed.json";
import Geocode from "react-geocode";
import "./App.css";
import styled from "styled-components";
import { MDBCol, MDBInput } from "mdbreact";
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
    socioeconomicFilter
  ]);

  // console.log("filteredVoters: ", filteredVoters);

  //Default: overview of North America
  const [latitude, setLatitude] = useState(54.526);
  const [longitude, setLongitude] = useState(-105.2551);
  const [zoom, setZoom] = useState(3);

  const toggle = dropdown => setCurrentDropdown(dropdown);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("view");

  //  const target = useRef(null);
  const ref = useRef(null);

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
                  <h3 style={filterStyle}>Select Filters</h3>

                  {mode === "filter" && (
                    <Row margin-top="100px">
                      <Col sm={{ size: "auto", offset: 8 }}>
                        <ListGroup>
                          <ButtonDropdown
                            isOpen={currentDropdown === "1"}
                            toggle={setCurrentDropdown.bind(this, "1")}
                          >
                            <DropdownToggle caret>
                              Party Affiliation
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  setPartyFilter("Democrat");
                                }}
                              >
                                Democrat
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setPartyFilter("Republican");
                                }}
                              >
                                Republican
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setPartyFilter("Independent");
                                }}
                              >
                                Independent
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>

                          <ButtonDropdown
                            isOpen={currentDropdown === "2"}
                            toggle={setCurrentDropdown.bind(this, "2")}
                          >
                            <DropdownToggle caret>
                              Registration Status
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  setRegistrationFilter(1);
                                }}
                              >
                                {" "}
                                Registered{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRegistrationFilter(0);
                                }}
                              >
                                Not Registered{" "}
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>

                          <ButtonDropdown
                            isOpen={currentDropdown === "3"}
                            toggle={setCurrentDropdown.bind(this, "3")}
                          >
                            <DropdownToggle caret>Age Range</DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  setAgeRangeFilter({ min: 18, max: 24 });
                                }}
                              >
                                {" "}
                                18-25{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setAgeRangeFilter({ min: 25, max: 34 });
                                }}
                              >
                                {" "}
                                25-35{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setAgeRangeFilter({ min: 35, max: 49 });
                                }}
                              >
                                {" "}
                                35-50{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setAgeRangeFilter({ min: 50, max: 69 });
                                }}
                              >
                                {" "}
                                50-70{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setAgeRangeFilter({ min: 70, max: 89 });
                                }}
                              >
                                {" "}
                                70-90{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setAgeRangeFilter({ min: 90, max: 110 });
                                }}
                              >
                                {" "}
                                90-110{" "}
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>

                          <ButtonDropdown
                            isOpen={currentDropdown === "4"}
                            toggle={setCurrentDropdown.bind(this, "4")}
                          >
                            <DropdownToggle caret> Race </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  setRaceFilter(
                                    "American Indian or Alaska Native"
                                  );
                                }}
                              >
                                {" "}
                                American Indian or Alaska Native{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRaceFilter("Asian");
                                }}
                              >
                                {" "}
                                Asian{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRaceFilter("Black or African American");
                                }}
                              >
                                {" "}
                                Black or African American{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRaceFilter("Hispanic or Latino");
                                }}
                              >
                                {" "}
                                Hispanic or Latino{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRaceFilter(
                                    "Native Hawaiian or Other Pacific Islander"
                                  );
                                }}
                              >
                                {" "}
                                Native Hawaiian or Other Pacific Islander{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRaceFilter("White");
                                }}
                              >
                                {" "}
                                White{" "}
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>

                          <ButtonDropdown
                            isOpen={currentDropdown === "5"}
                            toggle={setCurrentDropdown.bind(this, "5")}
                          >
                            <DropdownToggle caret>
                              {" "}
                              Socioeconomic status{" "}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  setSocioeconomicFilter("lower");
                                }}
                              >
                                {" "}
                                Low{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setSocioeconomicFilter("mid");
                                }}
                              >
                                {" "}
                                Medium{" "}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setSocioeconomicFilter("upper");
                                }}
                              >
                                {" "}
                                High{" "}
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </ListGroup>
                      </Col>
                    </Row>
                  )}
                </Modal>
              </Row>
            </div>
            <p></p>
          </>
          <p></p>
          <Row>
            <MDBCol md="8">
              <div>
                {filteredVoters.map(({ id, name }) => (
                  <p key={id}>{name}</p>
                ))}
              </div>
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
