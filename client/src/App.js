import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Location from "./Location";
// import data from './seed.json';

//Default Coordinates
const default_longitude = -122.4194;
const default_latitude = 37.7749;

//For the search text box
const searchContainer = styled.div`
  margin: 40px;
`;

const App = () => {
  const [mapCollection, setMapCollection] = useState([]);
  // const [search, setSearch] = useState('Please search');

  const locateUser = {
    position: "topright",
    strings: {
      title: "Go to location"
    },
    onActivate: () => {}
  };

  const handleMapClick = click => {
    //User can choose any five points on the map
    if (mapCollection.length <= 4) {
      const updatedMapCollection = mapCollection;
      updatedMapCollection.push([click.latlng.lat, click.latlng.lng]);
      setMapCollection(updatedMapCollection);
      alert(mapCollection);
    } else {
      alert("5 points already chosen");
    }
  };

  const handleSearchLocation = input => {};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">VoterApp</h1>
        <p className="App-intro">
          Voting is as much an emotional act as it is an intellectual one
        </p>
      </header>
      <p></p>
      <searchContainer>
        <textarea
          type="text"
          size="45"
          position="left"
          placeholder="Search location..."
          onClick={event => handleSearchLocation(event.target.value)}
        />
      </searchContainer>
      <Map
        center={[default_latitude, default_longitude]}
        zoom={12}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Location options={locateUser} />
      </Map>
    </div>
  );
};

export default App;
