import React from "react"
import { Map, Marker, Popup, TileLayer, LayersControl } from "react-leaflet"
import FullscreenControl from "react-leaflet-fullscreen"
import "react-leaflet-fullscreen/dist/styles.css"
import styled from "styled-components"

const StyledMap = styled(Map)`
  width: ${props => props.width};
  height: ${props => props.height};
`

interface PlacesMapProps {
  markers: Array<MarkerPoint>
  width: string
  height: string
}

export interface MarkerPoint {
  position: Array<number>
  title: string
  content: JSX.Element
}

const PlacesMap = ({ markers, width, height }: PlacesMapProps): JSX.Element => {
  // Can not render map server side
  if (typeof window !== "undefined") {
    const bounds = getBounds(markers)

    return (
      <StyledMap
        width={width}
        height={height}
        bounds={bounds}
        boundsOptions={{ padding: [50, 50] }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Topographic">
            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satelite">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>
          <FullscreenControl
            position="topright"
            titleCancel="Exit fullscreen"
            title="Fullscreen"
          />
          {markers &&
            markers.map(m => (
              <Marker
                key={m.position.toString() + m.content}
                position={m.position}
                title={m.title}
                riseOnHover="true"
              >
                <Popup>{m.content}</Popup>
              </Marker>
            ))}
        </LayersControl>
      </StyledMap>
    )
  } else {
    return null
  }
}

export default PlacesMap

const getBounds = (markers: Array<Marker>): Array<Array<number>> => {
  return markers.map(m => m.position)
}
