import { useEffect } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";
import PropTypes from "prop-types";

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

LocateControl.propTypes = {
  options: PropTypes.any.isRequired,
  leaflet: PropTypes.object.isRequired
  // map: PropTypes.isRequired
  //Expected in the Object leaflet:proptypes.object. Inside the leaflet object, like Map.
};

export default withLeaflet(LocateControl);
