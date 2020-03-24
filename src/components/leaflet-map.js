import React from "react"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const LeafletMap = ({markers}) => {

  // Can not render map server side
  if (typeof window !== 'undefined') {

    const bounds = getBounds(markers);

    return (
      <Map bounds={bounds} boundsOptions={{padding: [50, 50]}}
        style={{
          with: `100%`,
          height: `400px`
        }}
      >
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        {markers && markers.map(m => 
          <Marker key={m.position+m.content} position={m.position} title={m.title} riseOnHover="true">
            <Popup>{m.content}</Popup>
          </Marker>
        )}
      </Map>
    )
  } else {
    return null
  }
}

export default LeafletMap

const getBounds = (markers) => {
  return markers.map(m => m.position)
}