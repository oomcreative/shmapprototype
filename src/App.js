import "./styles.css";
import "@coreui/coreui/dist/css/coreui.min.css";

//slide for cards
//https://keen-slider.io/docs#usage-in-react
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import * as React from "react";
import { useState, useRef } from "react";

import "./slider.css";

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
  CCardSubtitle,
  CFormSwitch
} from "@coreui/react";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
  FillLayer,
  LineLayer,
  MapLayerMouseEvent
} from "react-map-gl";

//MARKERS
import Pin from "./pin.js";
import BatteryMarker from "./batteryMarker.js";
import MarkerEvent from "./markerEvents.js";
import MarkerMedia from "./markerMedia.js";
import MarkerLaqMax from "./markerLaqMax.js";

import Label from "./deviceLabel.js";

import site1Data from "./devicedata/site1_devices.js";
import site2Data from "./devicedata/site2_devices.js";

import outlineGeoJson from "./siteOutLine.json";

let map;

const siteLookUp = {
  site1: site1Data,
  site2: site2Data
};

export default function App() {
  const mapRef = useRef("mapRef");

  React.useEffect(() => {
    //reference to base map.
    console.log(mapRef);
    //

    return () => {
      console.log("MyComponent onUnmount");
    };
  }, []);

  //SLIDER HOOKS AND SETUP
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free",
    rtl: false,
    slides: { perView: "auto", spacing: 2 },
    // rtl: false,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  function Arrow(props) {
    const disabeld = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabeld}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  //set up pins

  const [pinSize, setPinSize] = useState(40);
  const [dataLayer, setDataLayer] = useState("test");
  const [site, setSite] = useState("site1");
  const [showLabels, setShowLabels] = useState(true);
  const [mapMax, setMapMax] = useState(true);
  const [showSiteOutline, toggleSiteOutline] = useState(true);
  const [aspect, setAspect] = useState("All");
  const [mediaMode, setMediaMode] = useState(false);

  let sampleDevices = siteLookUp[site];

  function toggleMediaMode() {
    setMediaMode(!mediaMode);
  }

  function toggleMapHeight() {
    setMapMax(!mapMax);

    //resize mapRef
  }

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);

      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
        ],
        { padding: 40, duration: 1000 }
      );
    }
  };

  function changeShowSiteOutline() {
    toggleSiteOutline(!showSiteOutline);
  }

  function changeShowLabels() {
    setShowLabels(!showLabels);
  }

  function changeDataLayer(selection) {
    if (selection === "media") {
      setMediaMode(true);
    } else {
      setMediaMode(false);
    }
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
    return text * pixelsPerChar + 2;
  };

  //CHANGE HERE FOR DATA STATE
  //VALUE IN CIRCLE

  //BEST APPROACH TO BAKE DATA INTO ELEMENT HERE
  //all requests will have lat/lon

  const outlineFillStyle: FillLayer = {
    type: "fill",
    paint: {
      "fill-color": "#000",
      "fill-opacity": 0.6
    }
  };

  const outlineLineStyle: LineLayer = {
    type: "line",
    paint: {
      "line-width": 2,
      "line-color": "#F17928"
    }
  };

  //reprocess the data, then pick the mode.
  //todo - copy data, and replace values with values etc.

  const pins = sampleDevices.map((device, index) => {
    let pinElement;

    // value: 45,
    // events: 0,
    // lamax: 10,
    // power: 45,
    // media: 2

    if (dataLayer === "icons") {
      pinElement = <Pin size={pinSize} value={device.lamax} />;
    } else if (dataLayer === "battery") {
      pinElement = <BatteryMarker size={pinSize} value={device.power} />;
    } else if (dataLayer === "events") {
      pinElement = <MarkerEvent size={pinSize} value={device.events} />;
    } else if (dataLayer === "lamax") {
      pinElement = <MarkerLaqMax size={pinSize} value={device.lamax} />;
    } else if (dataLayer === "media") {
      pinElement = <MarkerMedia size={pinSize} value={device.media} />;
    } else {
      pinElement = <Pin size={pinSize} value={device.value} />;
    }

    return (
      <Marker
        key={`marker-${index}`}
        longitude={device.lng}
        latitude={device.lat}
        anchor="center"
        // onClick={(e) => {
        //   // If we let the click event propagates to the map, it will immediately close the popup
        //   // with `closeOnClick: true`
        //   e.originalEvent.stopPropagation();
        //   setPopupInfo(city);
        // }}
      >
        {/* <Pin size={pinSize} value={device.value} /> */}
        {/* <BatteryMarker size={pinSize} value={device.value} /> */}
        {pinElement}
      </Marker>
    );
  });

  //VALUE IN LABELS
  let labels = sampleDevices.map((device, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={device.lng}
      latitude={device.lat}
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

  //Turn labels on off
  if (showLabels !== true) {
    labels = null;
  }

  //Cards
  const cards = sampleDevices.map((device, index) => (
    <div
      className="keen-slider__slide"
      //Need to make sizing here
      style={{ maxWidth: 200, minWidth: 200 }}
    >
      <CCard
        style={{
          height: "200px",
          display: "flex",
          backgroundColor: "#ccc"
          // marginRight:10
        }}
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
    </div>
  ));

  //make ake media card array
  //for each media element
  let mediaCollection = [];
  const haveMedia = sampleDevices.filter((d) => {
    return d.media > 0;
  });
  haveMedia.forEach((d, i, array) => {
    //adding for each media element from count
    for (var j = 0; j < d.media; j++) {
      mediaCollection.push(d);
    }
  });

  const mediaCards = mediaCollection.map((device, index) => (
    <div
      className="keen-slider__slide"
      //Need to make sizing here
      style={{ maxWidth: 200, minWidth: 200 }}
    >
      <CCard
        style={{
          height: "200px",
          display: "flex",
          backgroundColor: "#ccc"
          // marginRight:10
        }}
        key={`marker-${index}`}
      >
        {/* <CCardImage orientation="top" src="/images/react.jpg" /> */}
        <CCardBody>
          <CCardSubtitle className="mb-2 text-medium-emphasis">
            MEDIA CARD
          </CCardSubtitle>
          <div
            style={{ width: "170px", height: "100px", backgroundColor: "#555" }}
          ></div>
          <p>{device.name}</p>
        </CCardBody>
      </CCard>
    </div>
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

      <CFormSwitch
        label="Device labels"
        id="formSwitchCheckChecked"
        defaultChecked={showLabels}
        onClick={(e) => changeShowLabels()}
      />

      <CFormSwitch
        label="Show Site Outline"
        id="formSwitchCheckCheckedOutline"
        defaultChecked={showSiteOutline}
        onClick={(e) => changeShowSiteOutline()}
      />
      {/* <h1>Map component</h1> */}

      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 144.95224,
          latitude: -37.79832308,
          zoom: 13
        }}
        style={{ height: 800 }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        opacity={0.5}
        mapboxAccessToken="pk.eyJ1Ijoib29tY3JlYXRpdmUiLCJhIjoidGwwa0oxbyJ9.mFE-nHJZ81yI5C4PXENr9Q"
      >
        {showSiteOutline ? (
          <Source type="geojson" data={outlineGeoJson}>
            {/* <Layer /> */}
            <Layer {...outlineFillStyle} />
            <Layer {...outlineLineStyle} />
          </Source>
        ) : null}
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
          <CButtonGroup role="group" aria-label="Basic outlined example">
            <CButton color="secondary" onClick={(e) => toggleMapHeight()}>
              DOWN
            </CButton>
          </CButtonGroup>
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
              onClick={(e) => changeDataLayer("icons")}
            >
              Icons
            </CButton>
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
            <CButton
              color="primary"
              variant=""
              onClick={(e) => changeDataLayer("battery")}
            >
              Device Status
            </CButton>
            <CButton
              color="primary"
              variant=""
              onClick={(e) => changeDataLayer("media")}
            >
              Media
            </CButton>
          </CButtonGroup>
        </CContainer>
      </div>
      <CContainer>
        {" "}
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">
            {mediaMode ? mediaCards : cards}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </CContainer>

      <br />
    </div>
  );
}
