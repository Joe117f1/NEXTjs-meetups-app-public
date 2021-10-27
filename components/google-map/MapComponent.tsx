import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { geoLocationHandler } from '../../helpers/function-utils';
import LoadingSpinner from '../ui/LoadingSpinner';
import MeetupInfo from '../meetups/MeetupInfo';
import { Meetup, Coordinates } from '../../type-models/models';

const GOOGLE_MAPS_API = process.env.googleMapApi!;

const containerStyle = {
  width: '100%',
  height: '400px',
};

const DEFAULT_MAP_CENTER = {
  lat: 40.728827168047104,
  lng: -74.00033460059899,
};

interface Prop {
  meetups: Meetup[];
  newMapCenter: Coordinates | undefined;
}

const MapComponent: React.FC<Prop> = props => {
  const [map, setMap] = useState(null);
  const [selectedMeetup, setSelectedMeetup] = useState<Meetup | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Coordinates>();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API,
  });

  const meetupsLocations = props.meetups;

  useEffect(() => {
    geoLocationHandler(setCurrentPosition, DEFAULT_MAP_CENTER);
  }, []);

  const SelectMapMarkerHandler = (marker: Meetup) => {
    setSelectedMeetup(marker);
  };

  const onMarkerDragEnd = (ev: google.maps.MapMouseEvent) => {
    const lat = ev.latLng!.lat();
    const lng = ev.latLng!.lng();
    setCurrentPosition({ lat, lng });
  };

  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onLoadHandler = () => {
    if (map) {
      onLoad(map);
    }
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (props.newMapCenter) {
      setCurrentPosition(props.newMapCenter);
    }
  }, [props.newMapCenter]);

  const getMarkerElement = (position: Coordinates | undefined) => { //setting the user position marker on the map
    return (
      position ? (
        <Marker
          position={position}
          draggable={true}
          onDragEnd={ev => onMarkerDragEnd(ev)}
        />
      ) : null
    );
  };

  const mapMarker = getMarkerElement(currentPosition);

  return (
    <Fragment>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={16}
          onLoad={onLoadHandler}
          onUnmount={onUnmount}
        >
          {mapMarker}
          {meetupsLocations.map(item => { //setting markers of meetups (if exists...)
            return (
              <Marker
                key={item.id}
                position={item.address}
                onClick={() => SelectMapMarkerHandler(item)}
              />
            );
          })}
          {selectedMeetup && (
            <InfoWindow
              position={selectedMeetup.address}
              clickable={true}
              onCloseClick={() => setSelectedMeetup(null)}
            >
              <MeetupInfo
                title={selectedMeetup.title}
                description={selectedMeetup.description}
                address={selectedMeetup.address}
              />
            </InfoWindow>
          )}
        </GoogleMap>
      )}
      {!isLoaded && <LoadingSpinner />}
    </Fragment>
  );
};

export default React.memo(MapComponent);
