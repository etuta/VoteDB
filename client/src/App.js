import React, { useState, useEffect, useRef, Component } from "react";
import data from "./seed.json";
import Geocode from "react-geocode";
import "./App.css";
import styled from "styled-components";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Location from "./Location";
import { MDBCol, MDBInput } from "mdbreact";
import { List } from "immutable";


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
Geocode.setApiKey("AIzaSyDvsbOnTX_TwqyfQwlzzHCpm_ErpQHDMCo");
//Private API Key

const Button = styled.button``;

const mapStyles = {
  width: "100%",
  height: "100%"
};

const App = () => {
  const [target, setTarget] = useState(null);
  const [dropdownOpen, setOpen] = useState(false);
  const [mapCollection, setMapCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [currentDropdown, setCurrentDropdown] = useState("");
  const [voters, setVoters] = useState(List());


  const fetchVoters = () => {
    fetch(`/api/voters`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        setVoters(data);
      })
      .catch(err => console.log(err)); // eslint-disable-line no-console
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  //Default: overview of North America
  const [latitude, setLatitude] = useState(54.526);
  const [longitude, setLongitude] = useState(-105.2551);
  const [zoom, setZoom] = useState(3);

  const toggle = dropdown => setCurrentDropdown(dropdown);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("view");

  const [partyFilter, setPartyFilter] = useState(null);
  const [registrationFilter, setRegistrationFilter] = useState(null);
  const [ageFilter, setAgeFilter] = useState(null);
  const [raceFilter, setRaceFilter] = useState(null);
  const [socioeconomicFilter, setSocioeconomicFilter] = useState(null);


  const locateUser = {
    //Locate user button
    position: "topright",
    strings: {
      title: "Go to location"
    },
    onActivate: () => {}
  };

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

  const handleSearchLocation = () => {
    if (searchQuery) {
      Geocode.fromAddress(searchQuery).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
          setZoom(12);
        },
        error => {
          console.error("Please enter valid address");
        }
      );
    } else {
      alert("I'm sorry, I can't find the place you are looking for");
    }
    setSearchQuery(""); //Resets
  };

  const handleSearchPerson = () => {
    if (searchPerson) {
      const person = voters.find(voter => voter.name === searchPerson);
      if (person) {
        Geocode.fromAddress(person.address).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            setLatitude(lat);
            setLongitude(lng);
            setZoom(12);
          },
          error => {
            console.error("Please enter valid name");
          }
        );
      } else {
        alert("I'm sorry, I can't find the person you are looking for");
      }
    }
    setSearchPerson(""); //Resets
  };

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/voters/')
        .then(response => {
          console.log('Here ajghg jhajhvj jhajvgav hjhbjh');
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then(data => {
          setVoters(List(data));
          console.log(voters);
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    };
    fetchData();
  }, []);

  const filteredVoters = voters.filter (voter =>
     voter.party === partyFilter)
     .filter(voter => voter.registrationStatus === registrationFilter)
     .filter(voter => voter.ageRange === ageFilter)
     .filter(voter => voter.race === raceFilter)
     .filter(voter => voter.socioeconomicStatus === socioeconomicFilter);


  return (
    <Container>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Voter App</h1>
        </header>
        <p className="App-intro">Main page of the app</p>
        <>
          <Row>
            <MDBCol md="8">
              <input
                className="form-control"
                type="text"
                value={searchQuery.value}
                placeholder="Look up location..."
                aria-label="Search location"
                onClick={event => setSearchQuery(event.target.value)}
              />
            </MDBCol>
            <button
              disabled={!searchQuery}
              onClick={() => {
                handleSearchLocation();
              }}
              margin-right="40px"
              variant="Search on the Map"
            >
              Search
            </button>{" "}
            <button
              onClick={() => {
                setMode("filter");
              }}
              margin-left="400px"
              variant="Search by Filters:"
            >
              {" "}
              Search by Filters{" "}
            </button>{" "}
          </Row>
          <p></p>
          <Row>
            <MDBCol md="8">
              <input
                className="form-control"
                type="text"
                value={searchPerson.value}
                placeholder="To look up a person, please enter first and last name..."
                aria-label="Search person"
                onClick={event => setSearchPerson(event.target.value)}
              />
            </MDBCol>
            <button
              disabled={!searchPerson}
              onClick={() => {
                handleSearchPerson();
              }}
              margin-right="40px"
              variant="Search on the Map"
            >
              Search
            </button>{" "}
            <button
              onClick={() => {
                setMode("filter");
              }}
              margin-left="400px"
              variant="Search by Filters:"
            >
              {" "}
              Search by Filters{" "}
            </button>{" "}
          </Row>

          {mode === "filter" && (
            <Row margin-top="100px">
              <Col sm={{ size: "auto", offset: 8 }}>
                <ListGroup>
                  <ButtonDropdown
                    isOpen={currentDropdown === "1"}
                    toggle={setCurrentDropdown.bind(this, "1")}
                  >
                  <DropdownToggle caret>Party Affiliation</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={()=> {setPartyFilter("Democrat")}}>Democrat</DropdownItem>
                    <DropdownItem onClick={()=> {setPartyFilter("Republican")}}>Republican</DropdownItem>
                    <DropdownItem onClick={()=> {setPartyFilter("Independent")}}>Independent</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>

                  <ButtonDropdown
                    isOpen={currentDropdown === "2"}
                    toggle={setCurrentDropdown.bind(this, "2")}
                  >
                    <DropdownToggle caret>Registration Status</DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem onClick={()=> {setRegistrationFilter("Registered")}}> Registered </DropdownItem>
                    <DropdownItem onClick={()=> {setRegistrationFilter("Not Registered")}}>Not Registered </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown
                    isOpen={currentDropdown === "3"}
                    toggle={setCurrentDropdown.bind(this, "3")}
                  >
                    <DropdownToggle caret>Age Range</DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem onClick={()=> {setAgeFilter("18-25")}}> 18-25 </DropdownItem>
                    <DropdownItem onClick={()=> {setAgeFilter("25-35")}}> 25-35 </DropdownItem>
                    <DropdownItem onClick={()=> {setAgeFilter("35-50")}}> 35-50 </DropdownItem>
                    <DropdownItem onClick={()=> {setAgeFilter("50-70")}}> 50-70 </DropdownItem>
                    <DropdownItem onClick={()=> {setAgeFilter("70-90")}}> 70-90 </DropdownItem>
                    <DropdownItem onClick={()=> {setAgeFilter("90-110")}}> 90-110 </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown
                    isOpen={currentDropdown === "4"}
                    toggle={setCurrentDropdown.bind(this, "4")}
                  >
                    <DropdownToggle caret> Race </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem onClick={()=> {setRaceFilter("American Indian or Alaska Native")}}> American Indian or Alaska Native </DropdownItem>
                    <DropdownItem onClick={()=> {setRaceFilter("Asian")}}> Asian </DropdownItem>
                    <DropdownItem onClick={()=> {setRaceFilter("Black or African American")}}> Black or African American </DropdownItem>
                    <DropdownItem onClick={()=> {setRaceFilter("Hispanic or Latino")}}> Hispanic or Latino </DropdownItem>
                    <DropdownItem onClick={()=> {setRaceFilter("Native Hawaiian or Other Pacific Islander")}}> Native Hawaiian or Other Pacific Islander </DropdownItem>
                    <DropdownItem onClick={()=> {setRaceFilter("White")}}> White </DropdownItem>
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
                    <DropdownItem onClick={()=> {setSocioeconomicFilter("Low")}}> Low </DropdownItem>
                    <DropdownItem onClick={()=> {setSocioeconomicFilter("Medium")}}> Medium </DropdownItem>
                    <DropdownItem onClick={()=> {setSocioeconomicFilter("High")}}> High </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ListGroup>
              </Col>
            </Row>
          )}
        </>
        <p></p>
        <Map
          // google={window.google}
          center={[latitude, longitude]}
          zoom={zoom}
          onClick={handleMapClick}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Location options={locateUser} />
        </Map>
      </div>
    </Container>
  );
};

export default App;
