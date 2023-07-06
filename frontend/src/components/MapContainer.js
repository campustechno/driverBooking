import React, { useEffect, useState } from 'react';
import Map, { Marker, GeolocateControl } from 'react-map-gl';

const MapContainer = ({onLocationChange}) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '400px',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10
  });

  useEffect(() => {
    
  })

  const [meetPoint, setMeetPoint] = useState(null);

  const handleMapClick = (event) => {
    const { lngLat } = event;
    const [longitude, latitude] = lngLat;

    setMeetPoint({ latitude, longitude });
  };

  return (
    <div className="flex">
      <Map
        mapboxAccessToken="pk.eyJ1IjoicmFta3IiLCJhIjoiY2xqcTBqZXRtMDBxZzNkbGw5cmFxZjZuaiJ9.8gGJGZOx92lWEmQqoleuvQ"
        initialViewState={viewport}
        style={{ width: "100%", height: 400, position:"relative" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"

      >
        {meetPoint && (
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
        )}
        <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
      </Map>
      {/* <form>
        <input type="text" placeholder="Meet Point" readOnly value={meetPoint ? `${meetPoint.latitude}, ${meetPoint.longitude}` : ''} />
      </form> */}
    </div>
  );
};

export default MapContainer;
