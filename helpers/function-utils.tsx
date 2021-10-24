import { Coordinates } from '../type-models/models';

const GOOGLE_MAPS_API = process.env.googleMapApi!;

export const getAddressFromCoords = async (coords: Coordinates) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_MAPS_API}`
  );
  if (!response.ok) {
    throw new Error('Failed to load address, please try again later');
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  const address = data.results[0].formatted_address;
  return address;
};

export const getCoordsFromAddress = async (addressName: string) => {
  const urlAddress = encodeURI(addressName);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_MAPS_API}`
  );
  if (!response.ok) {
    throw new Error('Failed to load coordinates, please try again later');
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  const coordinates = data.results[0].geometry.location;
  console.log('coordinates: ', coordinates);
  console.log('tyepof coordinates: ', typeof coordinates.lat);
  return coordinates as Coordinates;
};

export const geoLocationHandler = (
  dispatchFunc: Function,
  defaultCenter?: Coordinates
) => {
  navigator.geolocation.getCurrentPosition(async position => {
    const coordinates = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    dispatchFunc(coordinates);
  }, dispatchFunc(defaultCenter)); //cb incase user refuse gelocation
};
