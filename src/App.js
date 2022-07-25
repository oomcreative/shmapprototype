import "./styles.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import * as React from "react";
import { useState } from "react";

import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButtonGroup,
  CButton,
  CContainer,
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle
} from "@coreui/react";

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

import site1Data from "./devicedata/site1_devices.js";
import site2Data from "./devicedata/site2_devices.js";

const siteLookUp = {
  site1: site1Data,
  site2: site2Data
};

export default function App() {
  //set up pins

  const [pinSize, setPinSize] = useState(70);
  const [dataLayer, setDataLayer] = useState("test");
  const [site, setSite] = useState("site1");
  const [aspect, setAspect] = useState("All");

  let sampleDevices = siteLookUp[site];

  function changeDataLayer(selection) {
    setDataLayer(selection);
  }

  function changeAspect(selection) {
    setAspect(selection);
  }

  function changeSite(selection) {
    sampleDevices = siteLookUp[selection];
    setSite(selection);
  }

  const widthForLabel = (text) => {
    const pixelsPerChar = 8;
    return text * pixelsPerChar;
  };

  //VALUE IN CIRCLE
  const pins = sampleDevices.map((device, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={device.longitude}
      latitude={device.latitude}
      anchor="center"
      // onClick={(e) => {
      //   // If we let the click event propagates to the map, it will immediately close the popup
      //   // with `closeOnClick: true`
      //   e.originalEvent.stopPropagation();
      //   setPopupInfo(city);
      // }}
    >
      <Pin size={pinSize} value={device.value} />
    </Marker>
  ));

  //VALUE IN LABELS
  const labels = sampleDevices.map((device, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={device.longitude}
      latitude={device.latitude}
      anchor="center"
      //Need to base Y offset on zoom level - position labels
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
  ));

  //Cards
  const cards = sampleDevices.map((device, index) => (
    <CCard
      style={{ width: "200px", display: "inline-block" }}
      key={`marker-${index}`}
    >
      {/* <CCardImage orientation="top" src="/images/react.jpg" /> */}
      <CCardBody>
        <h4>{device.name}</h4>
        <CCardSubtitle className="mb-2 text-medium-emphasis">
          Card subtitle
        </CCardSubtitle>
      </CCardBody>
    </CCard>
  ));

  return (
    <div
      className="App"
      style={{
        textAlign: "left"
      }}
    >
      <CDropdown>
        <CDropdownToggle color="secondary">{site}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href="#" onClick={(e) => changeSite("site1")}>
            Site 1
          </CDropdownItem>
          <CDropdownItem href="#" onClick={(e) => changeSite("site2")}>
            Site 2
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CButtonGroup role="group" aria-label="Basic outlined example">
        <CButton
          color="primary"
          variant="outline"
          onClick={(e) => changeAspect("All")}
          active={aspect === "All" ? true : false}
        >
          All
        </CButton>
        <CButton
          color="primary"
          variant="outline"
          onClick={(e) => changeAspect("Dust")}
        >
          Dust
        </CButton>
        <CButton
          color="primary"
          variant="outline"
          onClick={(e) => changeAspect("Noise")}
        >
          Noise
        </CButton>
        <CButton
          color="primary"
          variant="outline"
          onClick={(e) => changeAspect("Vibration")}
        >
          Vibration
        </CButton>
        <CButton
          color="primary"
          variant="outline"
          onClick={(e) => changeAspect("Water")}
        >
          Water
        </CButton>
      </CButtonGroup>
      <span style={{ marginLeft: "20px", fontSize: 14 }}>
        SELECTION: {site},{aspect},{dataLayer}
      </span>
      {/* <h1>Map component</h1> */}

      <Map
        initialViewState={{
          longitude: 144.95224,
          latitude: -37.79832308,
          zoom: 13
        }}
        style={{ width: 1300, height: 500 }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        opacity={0.5}
        mapboxAccessToken="pk.eyJ1Ijoib29tY3JlYXRpdmUiLCJhIjoidGwwa0oxbyJ9.mFE-nHJZ81yI5C4PXENr9Q"
      >
        {pins}
        {labels}
      </Map>

      <div
        style={{
          marginTop: -40,
          textAlign: "left"
        }}
      >
        <CContainer>
          <CDropdown direction="dropup">
            <CDropdownToggle color="secondary">Data to show</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Ph</CDropdownItem>
              <CDropdownItem href="#">Max Vibration Levels</CDropdownItem>
              <CDropdownItem
                href="#"
                variant="outline"
                onClick={(e) => changeDataLayer("events")}
              >
                Events
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <CButtonGroup role="group" aria-label="Basic outlined example">
            <CButton
              color="primary"
              variant=""
              onClick={(e) => changeDataLayer("lamax")}
            >
              LA Max
            </CButton>
            <CButton
              color="primary"
              variant=""
              onClick={(e) => changeDataLayer("events")}
            >
              Events
            </CButton>
            <CButton color="primary" variant="">
              Device Power
            </CButton>
            <CButton color="primary" variant="">
              Media
            </CButton>
          </CButtonGroup>
        </CContainer>
      </div>
      <CContainer>{cards}</CContainer>

      <br />
    </div>
  );
}
