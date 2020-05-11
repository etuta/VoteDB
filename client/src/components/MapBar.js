import React from "react";
import { Map, TileLayer } from "react-leaflet";
// Can also import Marker, Popup
import Location from "./Location.js";

function MapBar({ latitude, longitude, zoom, select }) {
  const locateUser = {
    position: "topright",
    strings: {
      title: "Go to location"
    },
    onActivate: () => {}
  };

  return (
    <Map center={[latitude, longitude]} zoom={zoom} onClick={select}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Location options={locateUser} />
    </Map>
  );
}

export default MapBar;
