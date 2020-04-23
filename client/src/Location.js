import React, { useEffect } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

const LocateControl = props => {
  useEffect(() => {
    const { options, startDirectly } = props;
    const { map } = props.leaflet;

    const location = new Locate(options);
    location.addTo(map);
  }, []);

  return null;
};

export default withLeaflet(LocateControl);
