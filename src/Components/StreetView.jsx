import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const StreetView = ({ lat, lng }) => {
  const panoRef = useRef(null);

  useEffect(() => {
    if (window.google && panoRef.current) {
      new window.google.maps.StreetViewPanorama(panoRef.current, {
        position: { lat, lng },
        pov: { heading: 0, pitch: 0 },
        zoom: 1,
      });
    }
  }, [lat, lng]);

  return <div ref={panoRef} style={containerStyle} />;
};

StreetView.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default StreetView;
