import React from "react"
import styled from "styled-components"
import "react-leaflet-fullscreen/dist/styles.css"
import L from "leaflet"
import * as geojson from "geojson"

const StyledMap = styled("div")<{ width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
`

interface Props {
  width: string
  height: string
  featureCollection: geojson.FeatureCollection<geojson.Point>
}

export default class Map extends React.PureComponent<Props, {}> {
  map: L.Map
  componentDidMount() {
    const osmTileLayer: L.Layer = L.tileLayer(
      "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    )
    const topoTileLayer: L.Layer = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    )
    const sateliteTileLayer: L.Layer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    )

    this.map = L.map("map", {
      layers: [topoTileLayer],
    })

    L.control
      .layers({
        Topographic: topoTileLayer,
        "Open Street Map": osmTileLayer,
        Satelite: sateliteTileLayer,
      })
      .addTo(this.map)

    const geoJson: L.GeoJSON = L.geoJSON(this.props.featureCollection)
    const bounds: L.LatLngBounds = geoJson.getBounds()
    geoJson.addTo(this.map)
    this.map.fitBounds(bounds)
  }

  render() {
    return (
      <StyledMap
        id="map"
        width={this.props.width}
        height={this.props.height}
      ></StyledMap>
    )
  }
}
