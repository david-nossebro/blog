import React, { useEffect, useState } from "react"
import styled from "styled-components"
import "leaflet/dist/leaflet.css"
import tj from "@mapbox/togeojson"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.css"

const MapDiv = styled.div`
  height: 760px;
  width: 100%;
`

import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIconShadow from "leaflet/dist/images/marker-shadow.png"

import tentIcon from "./tent.svg"
import messageIcon from "./message.svg"
import hikerIcon from "./hiking.svg"
import startIcon from "./start.svg"



const PositionMap = () => {

  if(typeof window === 'undefined') {
    return null
  }

  let L = require("leaflet")
  require("leaflet-fullscreen")
  require("leaflet-gpx")

  const TentIcon = L.icon({
    iconUrl: tentIcon,
    iconSize: [40, 40],
    popupAnchor: [0, -15],
  })
  
  const HikerIcon = L.icon({
    iconUrl: hikerIcon,
    iconSize: [40, 40],
    popupAnchor: [10, -30],
    iconAnchor: [10, 30],
  })
  
  const MessageIcon = L.icon({
    iconUrl: messageIcon,
    iconSize: [40, 40],
    iconAnchor: [7, 35],
    popupAnchor: [0, -15],
  })
  
  const StartIcon = L.icon({
    iconUrl: startIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 7],
  })
  
  const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
    iconAnchor: [13, 40],
    popupAnchor: [0, -35],
    iconSize: [40, 40],
  })
  
  L.Marker.prototype.options.icon = DefaultIcon

  const [map, setMap] = useState<L.Map | null>(null)
  const [geoJson, setGeoJson] = useState()
  const [currentZoomLevel, setCurrentZoomLevel] = useState(5)
  const [isInit, setIsInit] = useState(true)
  const [allMarkers, setAllMarkers] = useState<any[]>([])

  useEffect(() => {
    const topoMap = L.tileLayer(
      "https://b.tile.opentopomap.org/{z}/{x}/{y}.png"
    )

    const satelit = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    )

    const openStreetMap = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    )

    const mymap: L.Map = L.map("mapid", {
      layers: [topoMap, satelit, openStreetMap],
    }).setView([58.286395, 10.107422], 5)

    mymap.addControl(new L.Control.Fullscreen())

    const baseMaps = {
      Openstreetmap: openStreetMap,
      Satelit: satelit,
      Topografisk: topoMap,
    }

    L.control.layers(baseMaps).addTo(mymap)

    L.control.scale({ metric: true, imperial: false }).addTo(mymap)

    addEtappToMap(mymap, "/etapp-1-grovelsjon-hamra.gpx")
    addEtappToMap(mymap, "/etapp-2-hamra-are.gpx")
    addEtappToMap(mymap, "/etapp-3-are-rotviken.gpx")
    addEtappToMap(mymap, "/etapp-4-rotviken-gaddede.gpx")
    addEtappToMap(mymap, "/etapp-5-gaddede-klimpfjall.gpx")
    addEtappToMap(mymap, "/etapp-6-klimpfjall-hemavan.gpx")
    addEtappToMap(mymap, "/etapp-7-hemavan-ammarnas.gpx")
    addEtappToMap(mymap, "/etapp-8-ammarnas-jakkvik.gpx")
    addEtappToMap(mymap, "/etapp-9-jakkvik-kvikkjokk.gpx")
    addEtappToMap(mymap, "/etapp-10-kvikkjokk-staloluokta.gpx")
    addEtappToMap(mymap, "/etapp-11-staloluokta-anonjalme.gpx")
    addEtappToMap(mymap, "/etapp-12-ritsem-abisko.gpx")
    addEtappToMap(mymap, "/etapp-13-abisko-treriksroset.gpx")

    const markers: any[] = allMarkers
    const startMarker = L.marker([62.098576, 12.312181], {
      icon: StartIcon,
    })
    startMarker.bindPopup("Grövelsjön")
    markers.push(startMarker)
    startMarker.addTo(mymap)

    setAllMarkers(markers)

    mymap.on("zoomend", () => {
      setCurrentZoomLevel(mymap.getZoom())
    })
    setMap(mymap)
  }, [])

  useEffect(() => {
    const fetchGarminData = async () => {
      const result = await fetch("/garmin/davidsgronaband?d1=2021-01-01T00:00z")
      const resultText = await result.text()
      const parser = new DOMParser()
      const kml = parser.parseFromString(resultText, "text/xml")
      let geoJson = tj.kml(kml, { styles: false })

      if (!geoJson.features || geoJson.features.length === 0) {
        return
      }

      // Getting the newestFeature (also to be seen as the last known location)
      geoJson.features.sort((f1: any, f2: any) => {
        if (f1.geometry.type === "LineString") {
          return 1
        }
        if (f2.geometry.type === "LineString") {
          return -1
        }

        if (f1.properties.timestamp > f2.properties.timestamp) {
          return -1
        } else {
          return 1
        }
      })
      const newestFeature = geoJson.features[0]
      geoJson.features[0].properties.newestFeature = true
      console.log("newestFeature: ", JSON.stringify(newestFeature))

      // Remove all points that are just tracking points (we still show a linestring)
      geoJson = geoJson.features.filter((f: any) => {
        if (
          f.geometry.type === "Point" &&
          !f.properties.Text &&
          f !== newestFeature
        ) {
          return false
        } else {
          return true
        }
      })
      console.log("geoJson: ", JSON.stringify(geoJson))
      setGeoJson(geoJson)
    }
    fetchGarminData()
  }, [])

  useEffect(() => {
    if (map != null && geoJson != null) {
      if (isInit) {
        const markers: any[] = allMarkers
        const feature = L.geoJSON(geoJson, {
          pointToLayer: (feature, latlng) => {
            // Here we set some custom icons and popup texts.

            const marker = L.marker(latlng)
            let message = null

            const date = new Date(feature.properties.timestamp)
            if (feature.properties.Text) {
              message = feature.properties.Text

              if (message.includes("sov") || message.includes("tält")) {
                TentIcon.options.iconSize = [40, 40]
                marker.setIcon(TentIcon)
              } else {
                MessageIcon.options.iconSize = [40, 40]
                marker.setIcon(MessageIcon)
              }
            }

            if (feature.properties.newestFeature) {
              if (message === null) {
                message = "Sist jag skicka en uppdatering va jag här."
                HikerIcon.options.iconSize = [40, 40]
              }

              marker.setIcon(HikerIcon)
            }

            if (message) {
              message += "<br /><br />" + date.toLocaleString()
              marker.bindPopup(message)
            }

            markers.push(marker)
            return marker
          },
          style: () => {
            return { color: "#04ff00", weight: 5 }
          },
        }).addTo(map)

        setAllMarkers(markers)
        map.fitBounds(feature.getBounds())
        setIsInit(false)
      } else {
        // Change the icon size based on the zoom level.
        allMarkers?.forEach(m => {
          const icon = m.getIcon()
          const size = 3 * currentZoomLevel
          icon.options.iconSize = [size, size]
          m.setIcon(icon)
        })
      }
    }
  }, [geoJson, map, allMarkers, isInit, currentZoomLevel])

  return <MapDiv id="mapid" />
}

export default PositionMap

const addEtappToMap = (map, etapp) => {
  new L.GPX(etapp, {
    async: true,
    // eslint-disable-next-line @typescript-eslint/camelcase
    marker_options: {
      startIconUrl: null,
      endIconUrl: null,
      shadowUrl: null,
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    polyline_options: {
      color: "red",
      opacity: 1,
      weight: 3,
      lineCap: "round",
    },
  }).addTo(map)
}
