import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapView = ({ lat, lng }) => {
  const [landmarks, setLandmarks] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const center = { lat, lng };

  const landmarkTypes = ["school", "restaurant", "shopping_mall"];

  // const getIconByType = (types) => {
  //   if (types.includes("school")) {
  //     return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
  //   }
  //   if (types.includes("restaurant")) {
  //     return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  //   }
  //   if (types.includes("shopping_mall")) {
  //     return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
  //   }
  //   return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // default
  // };

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);

    landmarkTypes.forEach((type) => {
      const request = {
        location: center,
        radius: 1500, // meters
        type: type,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setLandmarks((prev) => [...prev, ...results]);
        }
      });
    });
  }, [isLoaded]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={(map) => (mapRef.current = map)}
    >
      {/* Property marker */}
      <Marker position={center} />

      {/* Landmark markers */}
      {landmarks.map((place, index) => (
        <Marker
          key={index}
          position={place.geometry.location}
          onClick={() => setSelectedPlace(place)}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}
        />
      ))}

      {/* InfoWindow for selected place */}
      {selectedPlace && (
        <InfoWindow
          position={selectedPlace.geometry.location}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <strong>{selectedPlace.name}</strong>
            <br />
            {selectedPlace.vicinity}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
};

MapView.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default MapView;
