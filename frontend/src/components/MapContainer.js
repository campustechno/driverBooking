import React, { useEffect, useState } from 'react';
import Map, { Marker, GeolocateControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';

const MapContainer = ({onLocationChange}) => {
  const [address, setAddress] = useState('');



  const [viewport, setViewport] = useState({
    width: '100%',
    height: '400px',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10
  });

  const geocodingClient = MapboxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS,
  });

  useEffect(() => {
    convertCoordinatesToAddress(viewport.latitude, viewport.longitude);
  }, [viewport.latitude, viewport.longitude]);
  

  useEffect(() => {
    onLocationChange(address)
  },[address])

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
    const { latitude, longitude } = newViewport;
    convertCoordinatesToAddress(latitude, longitude);
  };
  

  const convertCoordinatesToAddress = async (latitude, longitude) => {
    try {
      const response = await geocodingClient.reverseGeocode({
        query: [longitude, latitude],
        limit: 1,
      }).send();
      
      if (response && response.body && response.body.features.length > 0) {
        const place = response.body.features[0];
        const formattedAddress = place.place_name;
        setAddress(formattedAddress);
        // console.log(formattedAddress);
      }
    } catch (error) {
      console.log('Error converting coordinates to address:', error);
    }
  };
  
  // const [meetPoint, setMeetPoint] = useState(null);

  // const handleMapClick = (event) => {
  //   const { lngLat } = event;
  //   const [longitude, latitude] = lngLat;

  //   setMeetPoint({ latitude, longitude });
  // };

  return (
    <div className="flex">
      <Map
        mapboxAccessToken="pk.eyJ1IjoicmFta3IiLCJhIjoiY2xqcTBqZXRtMDBxZzNkbGw5cmFxZjZuaiJ9.8gGJGZOx92lWEmQqoleuvQ"
        initialViewState={viewport}
        style={{ width: "100%", height: 400, position:"relative" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={evt => handleViewportChange(evt.viewState)}
      >
        {/* {meetPoint && (
          <Marker
            latitude={meetPoint.latitude}
            longitude={meetPoint.longitude}
            draggable
            onDragEnd={(event) => {
              const { lngLat } = event;
              const [longitude, latitude] = lngLat;

              setMeetPoint({ latitude, longitude });
            }}
          >
            <img
              src="https://www.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg"
              alt="Meet Point"
              width={40}
              height={40}
            />
          </Marker>
        )} */}
        <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
      </Map>
      {/* <form>
        <input type="text" placeholder="Meet Point" readOnly value={meetPoint ? `${meetPoint.latitude}, ${meetPoint.longitude}` : ''} />
      </form> */}
    </div>
  );
};

export default MapContainer;
