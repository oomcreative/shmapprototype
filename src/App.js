import "./styles.css";

import * as React from "react";
import { useState, useMemo } from "react";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from "react-map-gl";

import Pin from "./pin.js";
import Label from "./deviceLabel.js";

let sampleDevices = [
  {
    longitude: 144.9435711,
    latitude: -37.80001859,
    name: "sample name",
    value: 45
  },
  {
    longitude: 144.95125997811556,
    latitude: -37.79627278657891,
    name: "Corner Park",
    value: 15
  },
  {
    longitude: 144.9448586,
    latitude: -37.80842773,
    name: "Long name for device",
    value: 35
  },
  {
    longitude: 144.95224,
    latitude: -37.79832308,
    name: "Gatehouse",
    value: 36
  },
  {
    longitude: 144.9585056,
    latitude: -37.81398809,
    name: "sample name",
    value: 34
  },
  {
    longitude: 144.9472618,
    latitude: -37.80754617,
    name: "Spencer Street",
    value: 36
  },
  {
    longitude: 144.9615955,
    latitude: -37.79913693,
    name: "Uni Melb",
    value: 36
  }
];

export default function App() {
  //set up pins

  const pinSize = 30;

  const pins = useMemo(
    () =>
      sampleDevices.map((device, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={device.longitude}
          latitude={device.latitude}
          anchor="center"
          offset={[0, 0]}
          // onClick={(e) => {
          //   // If we let the click event propagates to the map, it will immediately close the popup
          //   // with `closeOnClick: true`
          //   e.originalEvent.stopPropagation();
          //   setPopupInfo(city);
          // }}
        >
          <Pin size={pinSize} value={device.value} />
        </Marker>
      )),
    []
  );

  const widthForLabel = (text) => {
    const pixelsPerChar = 8;
    return text * pixelsPerChar;
  };

  const labels = useMemo(
    () =>
      sampleDevices.map((device, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={device.longitude}
          latitude={device.latitude}
          anchor="center"
          //Need to base Y offset on zoom level.
          offset={[-widthForLabel(device.name.length) / 8, -36]}
          // onClick={(e) => {
          //   // If we let the click event propagates to the map, it will immediately close the popup
          //   // with `closeOnClick: true`
          //   e.originalEvent.stopPropagation();
          //   setPopupInfo(city);
          // }}
        >
          <Label
            textForLabel={device.name}
            width={widthForLabel(device.name.length)}
          />
        </Marker>
      )),
    []
  );

  return (
    <div className="App">
      <h1>Data on map</h1>

      <Map
        initialViewState={{
          longitude: 144.95224,
          latitude: -37.79832308,
          zoom: 13
        }}
        style={{ width: 1000, height: 400 }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        opacity={0.5}
        mapboxAccessToken="pk.eyJ1Ijoib29tY3JlYXRpdmUiLCJhIjoidGwwa0oxbyJ9.mFE-nHJZ81yI5C4PXENr9Q"
      >
        {pins}
        {labels}
      </Map>
    </div>
  );
}
