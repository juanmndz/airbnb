import { useState } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {

const [selectedLocation, setSelectedLocation] = useState({})
  //   transform search results into
  // {latitude:52.2, longitude: 12.435}

  const coordinates = searchResults?.map(result => ({
      longitude: result.long,
      latitude: result.lat
  }))

  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGl
      mapStyle="mapbox://styles/juanmndz/ckvpyaymi59g015rlexnfqps2"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
      {...viewport}
    >
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                > 
                <p aria-label="push-pin" role="img" onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">
                📌
                </p>
                </Marker>
                {selectedLocation.long === result.long ? (
                    <Popup
                    onClose={() => setSelectedLocation({})}
                    closeOnClick={true}
                    latitude={result.lat}
                    longitude={result.long}
                    >
                        {result.title}
                    </Popup>
                ) : false }
            </div>
        ))}
    </ReactMapGl>
  );
}

export default Map;
