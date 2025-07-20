export async function fetchDistanceMatrix(origin, destination) {
  const directionsService = new window.google.maps.DirectionsService();

  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === "OK") {
          const leg = response.routes[0].legs[0];
          resolve({
            distance: leg.distance.text,
            duration: leg.duration.text,
          });
        } else {
          reject(`Directions request failed: ${status}`);
        }
      }
    );
  });
}
