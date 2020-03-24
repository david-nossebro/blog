import React from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'
import FullscreenControl from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/dist/styles.css'

const BlogMap = ({position, width, height}) => {

  // Can not render map server side
  if (typeof window !== 'undefined') {

    return (
      <Map center={position} zoom={13}
        style={{
          width: width,
          height: height
        }}
      >
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        <FullscreenControl position="topright" titleCancel="Exit fullscreen" title="Fullscreen" />
        <Marker position={position} />
      </Map>
    )
  } else {
    return null
  }
}

export default BlogMap