import React from "react"
import { Link } from "gatsby"
import {
  Map,
  Popup,
  TileLayer,
  LayersControl,
  GeoJSON,
  FeatureGroup,
} from "react-leaflet"
import FullscreenControl from "react-leaflet-fullscreen"
import "react-leaflet-fullscreen/dist/styles.css"
import styled from "styled-components"
import typography, { rhythm, scale } from "../utils/typography"
import * as geojson from "geojson"

const StyledMap = styled(Map)`
  width: ${props => props.width};
  height: ${props => props.height};
`

const MarkerPopupTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${rhythm(1 / 4)};
`

const MarkerPopupTitleLink = styled(Link)`
  box-shadow: none;
`

const Date = styled.small`
  ${scale(-1 / 5)};
  font-family: ${typography.toJSON().body.fontFamily};
`

const Content = styled.p`
  font-family: ${typography.toJSON().body.fontFamily};
  ${scale(-1 / 16)};
`

interface Props {
  width: string
  height: string
  featureCollection: geojson.FeatureCollection<geojson.Point>
}

export default class PlacesMap extends React.PureComponent<Props, {}> {
  bounds: Array<Array<number>>
  constructor(props) {
    super(props)
    this.bounds = getBounds(this.props.featureCollection)
  }

  render() {
    // Can not render map server side
    if (typeof window !== "undefined") {
      return (
        <StyledMap
          width={this.props.width}
          height={this.props.height}
          bounds={this.bounds}
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
            <FeatureGroup>
              {this.props.featureCollection &&
                this.props.featureCollection.features.map((feature, index) => (
                  <GeoJSON key={index} data={feature}>
                    {feature.properties.popup && (
                      <Popup>
                        <MarkerPopupTitle>
                          <MarkerPopupTitleLink to={feature.properties.slug}>
                            {feature.properties.title}
                          </MarkerPopupTitleLink>
                        </MarkerPopupTitle>
                        <Date>{feature.properties.date}</Date>
                        <Content>{feature.properties.content}</Content>
                      </Popup>
                    )}
                  </GeoJSON>
                ))}
            </FeatureGroup>
          </LayersControl>
        </StyledMap>
      )
    } else {
      return null
    }
  }
}

const getBounds = (
  featureCollection: geojson.FeatureCollection<geojson.Point>
): Array<Array<number>> => {
  const bounds = [[]]
  featureCollection.features.forEach(f => {
    // In GeoJson the coordinates are in the order [longitude, latitude] (a third value for height can be present)
    // In React-Leafleet location is given as [latitude, longitude]
    bounds.push([
      f.geometry.coordinates[1], // Latitude
      f.geometry.coordinates[0], // Longitude
    ])
  })

  return bounds
}
