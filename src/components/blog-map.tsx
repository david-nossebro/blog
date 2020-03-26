import React from "react"
import { Map, Marker, TileLayer } from "react-leaflet"
import FullscreenControl from "react-leaflet-fullscreen"
import "react-leaflet-fullscreen/dist/styles.css"
import styled from "styled-components"

export interface BlogMapProps {
  position: Array<number>
  width: string
  height: string
}

const BlogMap = ({ position, width, height }: BlogMapProps): JSX.Element => {
  const BlogMap = styled(Map)`
    width: ${width};
    height: ${height};
  `

  // Can not render map server side
  if (typeof window !== "undefined") {
    return (
      <BlogMap center={position} zoom={13}>
        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
        <FullscreenControl
          position="topright"
          titleCancel="Exit fullscreen"
          title="Fullscreen"
        />
        <Marker position={position} />
      </BlogMap>
    )
  } else {
    return null
  }
}

export default BlogMap
