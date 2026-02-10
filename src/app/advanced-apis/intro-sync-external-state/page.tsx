'use client';
import { useSyncExternalStore } from 'react';

type LocationData =
  | { status: 'unavailable'; geo?: never }
  | { status: 'available'; geo: GeolocationPosition };

// this variable is our external store
let location: LocationData = { status: 'unavailable' };

function subscribeToGeolocation(callback: () => void) {
  const watchId = navigator.geolocation.watchPosition((position) => {
    location = { status: 'available', geo: position };
    callback();
  });

  return () => {
    location = { status: 'unavailable' };
    return navigator.geolocation.clearWatch(watchId);
  };
}

function getGeolocationSnapshot() {
  return location;
}

function MyLocation() {
  const location = useSyncExternalStore(
    subscribeToGeolocation,
    getGeolocationSnapshot,
  );

  return (
    <div>
      <h2>Intro to Sync External State</h2>
      <a
        className="text-gray-400 mb-4 block hover:text-blue-600"
        href="https://github.com/brunar/epic-br/tree/main/src/app/advanced-apis/intro-sync-external-state"
        target="_blank"
      >
        (See readme.mdx)
      </a>
      <b className="mb-6 block">Hook useSyncExternalStore()</b>
      {location.status === 'unavailable' ? (
        <p>Your location is unavailable.</p>
      ) : (
        <>
          <p>Your location is:</p>
          <p>Latitude: {location.geo.coords.latitude.toFixed(4)}˚</p>
          <p>Longitude: {location.geo.coords.longitude.toFixed(4)}˚</p>
        </>
      )}
    </div>
  );
}

export default MyLocation;
