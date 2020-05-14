import { useEffect } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

const LocateControl = props => {
  useEffect(() => {
    const { options } = props;
    const { map } = props.leaflet;

    const location = new Locate(options);
    location.addTo(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default withLeaflet(LocateControl);
