import React from "react"
import { Map, Marker, Popup, TileLayer, LayersControl } from 'react-leaflet'
import FullscreenControl from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/dist/styles.css'
import styled from "styled-components"

const PlacesMap = ({markers, width, height}) => {

  const PlacesMap = styled(Map)`
    width: ${width};
    height: ${height};
  `

  // Can not render map server side
  if (typeof window !== 'undefined') {

    const bounds = getBounds(markers);

    return (
      <PlacesMap 
        bounds={bounds} 
        boundsOptions={{padding: [50, 50]}}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Topographic">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satelite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <FullscreenControl position="topright" titleCancel="Exit fullscreen" title="Fullscreen" />
          {markers && markers.map(m => 
            <Marker key={m.position+m.content} position={m.position} title={m.title} riseOnHover="true">
              <Popup>{m.content}</Popup>
            </Marker>
          )}
        </LayersControl>
      </PlacesMap>
    )
  } else {
    return null
  }
}

export default PlacesMap

const getBounds = (markers) => {
  return markers.map(m => m.position)
}