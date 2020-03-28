import React from "react"
import { Map, Marker, TileLayer } from "react-leaflet"
import FullscreenControl from "react-leaflet-fullscreen"
import "react-leaflet-fullscreen/dist/styles.css"
import styled from "styled-components"

const StyledMap = styled(Map)`
  width: ${props => props.width};
  height: ${props => props.height};
`

export interface BlogMapProps {
  position: Array<number>
  width: string
  height: string
}

const BlogMap = ({ position, width, height }: BlogMapProps): JSX.Element => {
  // Can not render map server side
  if (typeof window !== "undefined") {
    return (
      <StyledMap width={width} height={height} center={position} zoom={13}>
        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
        <FullscreenControl
          position="topright"
          titleCancel="Exit fullscreen"
          title="Fullscreen"
        />
        <Marker position={position} />
      </StyledMap>
    )
  } else {
    return null
  }
}

export default BlogMap
