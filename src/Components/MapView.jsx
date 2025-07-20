import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { fetchDistanceMatrix } from "../utils/fetchDistance";
import StreetView from "./StreetView"; // Adjust path if needed

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapView = ({ lat, lng }) => {
  const [landmarks, setLandmarks] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [distanceInfo, setDistanceInfo] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const center = { lat, lng };

  const landmarkTypes = ["school", "restaurant", "shopping_mall", "cafe"];

  // Optional: Use different icons per type
  const getIconByType = (types = []) => {
    if (types.includes("school")) return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
    if (types.includes("restaurant")) return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
    if (types.includes("shopping_mall")) return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
    return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // default
  };

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);

    landmarkTypes.forEach((type) => {
      const request = {
        location: center,
        radius: 1500,
        type: type,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setLandmarks((prev) => [...prev, ...results]);
        }
      });
    });
  }, [isLoaded]);

  useEffect(() => {
    if (!lat || !lng || !isLoaded) return;

    const origin = { lat, lng };
    const destination = "Indiranagar Metro Station, Bangalore";

    fetchDistanceMatrix(origin, destination)
      .then((result) => setDistanceInfo(result))
      .catch((err) => console.error("DistanceMatrix error:", err));
  }, [isLoaded, lat, lng]);

  return isLoaded ? (
    <>
      {/* Main Map */}
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
            icon={{ url: getIconByType(place.types) }}
          />
        ))}

        {/* InfoWindow on landmark marker click */}
        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.geometry.location}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <strong>{selectedPlace.name}</strong>
              <br />
              {selectedPlace.vicinity}
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${encodeURIComponent(
                  selectedPlace.vicinity
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Open in Google Maps
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Street View */}
      <div style={{ marginTop: "20px" }}>
        <h3>Street View</h3>
        <StreetView lat={lat} lng={lng} />
      </div>

      {/* Distance info */}
      {distanceInfo && (
        <div style={{ marginTop: "10px" }}>
          <strong>🛤️ Indiranagar Metro Station:</strong>
          <br />
          Distance: {distanceInfo.distance}, Duration: {distanceInfo.duration}
        </div>
      )}
    </>
  ) : (
    <p>Loading map...</p>
  );
};

MapView.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default MapView;
