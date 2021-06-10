import React, { useEffect, useState } from "react"
import styled from "styled-components"
import "leaflet/dist/leaflet.css"
import tj from "@mapbox/togeojson"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"

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
import checkpointIcon from "./checkpoint.svg"
import goalIcon from "./goal.svg"

const PositionMap = () => {
  if (typeof window === "undefined") {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // This is a workaround since leaflet did not play that well with Gatsby and SSR.
  const L = require("leaflet")
  require("leaflet-fullscreen")
  require("leaflet-gpx")

  const TentIcon = L.icon({
    iconUrl: tentIcon,
  })

  const HikerIcon = L.icon({
    iconUrl: hikerIcon,
    iconSize: [25, 25],
  })

  const MessageIcon = L.icon({
    iconUrl: messageIcon,
    iconSize: [25, 25],
  })

  const StartIcon = L.icon({
    iconUrl: startIcon,
    iconSize: [25, 25],
  })

  const CheckpointIcon = L.icon({
    iconUrl: checkpointIcon,
    iconSize: [25, 25],
  })

  const GoalIcon = L.icon({
    iconUrl: goalIcon,
    iconSize: [25, 25],
  })

  const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
    iconSize: [25, 25],
  })

  L.Marker.prototype.options.icon = DefaultIcon

  const [map, setMap] = useState<L.Map | null>(null)
  const [geoJson, setGeoJson] = useState()
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

    const lantmaterietMap = L.tileLayer(
      "https://minkarta.lantmateriet.se/map/topowebbcache/?layer=topowebb&style=default&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}"
    )

    const mymap: L.Map = L.map("mapid", {
      layers: [topoMap, satelit, openStreetMap, lantmaterietMap],
    }).setView([63.973740136963514, 14.164160770004948], 5)

    const baseMaps = {
      Openstreetmap: openStreetMap,
      "Openstreetmap Topografisk": topoMap,
      Satelit: satelit,
      Lantmäteriet: lantmaterietMap,
    }

    L.control.layers(baseMaps).addTo(mymap)
    L.control.scale({ metric: true, imperial: false }).addTo(mymap)
    mymap.addControl(new L.Control.Fullscreen())

    addAllEtappToMap(mymap)

    const checkpointMarkers = addCheckpointsToMap(
      mymap,
      StartIcon,
      CheckpointIcon,
      GoalIcon
    )
    const markers: any[] = allMarkers
    markers.push(...checkpointMarkers)
    setAllMarkers(markers)

    mymap.on("zoomend", () => {
      // Change the icon size based on the zoom level.
      console.log("allMarkers.length: ", allMarkers.length)
      const currentZoomLevel = mymap.getZoom()
      allMarkers?.forEach(m => {
        const icon = m.getIcon()
        let size = 0
        if (currentZoomLevel > 7) {
          size = 48
        } else if (currentZoomLevel > 6) {
          size = 5 * currentZoomLevel
        } else if (currentZoomLevel > 5) {
          size = 4 * currentZoomLevel
        } else {
          size = 3 * currentZoomLevel
        }

        icon.options.iconSize = [size, size]

        console.log("Changing icon size: ", size)

        m.setIcon(icon)
      })
      console.log("CurrentZoomLevel: ", currentZoomLevel)
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
      }
    }
  }, [geoJson, map, allMarkers, isInit])

  return <MapDiv id="mapid" />
}

export default PositionMap

const addAllEtappToMap = map => {
  addEtappToMap(map, "/etapp-1-grovelsjon-hamra.gpx")
  addEtappToMap(map, "/etapp-2-hamra-are.gpx")
  addEtappToMap(map, "/etapp-3-are-rotviken.gpx")
  addEtappToMap(map, "/etapp-4-rotviken-gaddede.gpx")
  addEtappToMap(map, "/etapp-5-gaddede-klimpfjall.gpx")
  addEtappToMap(map, "/etapp-6-klimpfjall-hemavan.gpx")
  addEtappToMap(map, "/etapp-7-hemavan-ammarnas.gpx")
  addEtappToMap(map, "/etapp-8-ammarnas-jakkvik.gpx")
  addEtappToMap(map, "/etapp-9-jakkvik-kvikkjokk.gpx")
  addEtappToMap(map, "/etapp-10-kvikkjokk-staloluokta.gpx")
  addEtappToMap(map, "/etapp-11-staloluokta-anonjalme.gpx")
  addEtappToMap(map, "/etapp-12-ritsem-abisko.gpx")
  //addEtappToMap(map, "/etapp-13-abisko-treriksroset.gpx")
}

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

const addCheckpointsToMap = (map, StartIcon, CheckpointIcon, GoalIcon) => {
  const markers: any[] = []

  const startMarker = L.marker([62.098576, 12.312181], {
    icon: StartIcon,
  })
  startMarker.bindPopup(
    "<b>Grövelsjön</b><br />Etapp 1<br /><br />Här startar jag den 20/6"
  )
  markers.push(startMarker)
  startMarker.addTo(map)

  const hamraCheckpoint = L.marker([62.57449456624782, 12.22619640574676], {
    icon: CheckpointIcon,
  })
  hamraCheckpoint.bindPopup(
    "<b>Hamra</b><br />Etapp 2<br /><br />Här borde jag vara ungefär 22/6"
  )
  markers.push(hamraCheckpoint)
  hamraCheckpoint.addTo(map)

  const areCheckpoint = L.marker([63.39930326857423, 13.081613179367837], {
    icon: CheckpointIcon,
  })
  areCheckpoint.bindPopup(
    "<b>Åre</b><br />Etapp 3<br /><br />Här borde jag vara ungefär 27/6"
  )
  markers.push(areCheckpoint)
  areCheckpoint.addTo(map)

  const rotvikenCheckpoint = L.marker(
    [63.973740136963514, 14.164160770004948],
    {
      icon: CheckpointIcon,
    }
  )
  rotvikenCheckpoint.bindPopup(
    "<b>Rötviken</b><br />Etapp 4<br /><br />Här borde jag vara ungefär 2/7"
  )
  markers.push(rotvikenCheckpoint)
  rotvikenCheckpoint.addTo(map)

  const gaddedeCheckpoint = L.marker([64.49929661611252, 14.142118739191982], {
    icon: CheckpointIcon,
  })
  gaddedeCheckpoint.bindPopup(
    "<b>Gäddede</b><br />Etapp 5<br /><br />Här borde jag vara ungefär 5/7"
  )
  markers.push(gaddedeCheckpoint)
  gaddedeCheckpoint.addTo(map)

  const klimpfjallCheckpoint = L.marker(
    [65.06084680056372, 14.796034927758578],
    {
      icon: CheckpointIcon,
    }
  )
  klimpfjallCheckpoint.bindPopup(
    "<b>Klimpfjäll</b><br />Etapp 6<br /><br />Här borde jag vara ungefär 8/7"
  )
  markers.push(klimpfjallCheckpoint)
  klimpfjallCheckpoint.addTo(map)

  const hemavanCheckpoint = L.marker([65.81919461574988, 15.084501604289215], {
    icon: CheckpointIcon,
  })
  hemavanCheckpoint.bindPopup(
    "<b>Hemavan</b><br />Etapp 7<br /><br />Här borde jag vara ungefär 13/7"
  )
  markers.push(hemavanCheckpoint)
  hemavanCheckpoint.addTo(map)

  const ammarnasCheckpoint = L.marker([65.95831217769249, 16.212346014096262], {
    icon: CheckpointIcon,
  })
  ammarnasCheckpoint.bindPopup(
    "<b>Ammarnäs</b><br />Etapp 8<br /><br />Här borde jag vara ungefär 16/7"
  )
  markers.push(ammarnasCheckpoint)
  ammarnasCheckpoint.addTo(map)

  const jakkvikCheckpoint = L.marker([66.39027240859454, 16.964899614110397], {
    icon: CheckpointIcon,
  })
  jakkvikCheckpoint.bindPopup(
    "<b>Jäkkvik</b><br />Etapp 9<br /><br />Här borde jag vara ungefär 19/7"
  )
  markers.push(jakkvikCheckpoint)
  jakkvikCheckpoint.addTo(map)

  const kvikkjokkCheckpoint = L.marker([66.95046031431508, 17.72599102152126], {
    icon: CheckpointIcon,
  })
  kvikkjokkCheckpoint.bindPopup(
    "<b>Kvikkjokk</b><br />Etapp 10<br /><br />Här borde jag vara ungefär 22/7"
  )
  markers.push(kvikkjokkCheckpoint)
  kvikkjokkCheckpoint.addTo(map)

  const staloluoktaCheckpoint = L.marker(
    [67.32129692699093, 16.698834652358922],
    {
      icon: CheckpointIcon,
    }
  )
  staloluoktaCheckpoint.bindPopup(
    "<b>Stáloluokta</b><br />Etapp 11<br /><br />Här borde jag vara ungefär 25/7"
  )
  markers.push(staloluoktaCheckpoint)
  staloluoktaCheckpoint.addTo(map)

  const anonjalmeCheckpoint = L.marker([67.64583429826214, 17.37169214477333], {
    icon: CheckpointIcon,
  })
  anonjalmeCheckpoint.bindPopup(
    "<b>Änonjalme</b><br /><br />Här borde jag vara ungefär 27/7"
  )
  markers.push(anonjalmeCheckpoint)
  anonjalmeCheckpoint.addTo(map)

  const ritsemCheckpoint = L.marker([67.72261633496483, 17.469227782148515], {
    icon: CheckpointIcon,
  })
  ritsemCheckpoint.bindPopup(
    "<b>Ritsem</b><br />Etapp 12<br /><br />Här borde jag vara ungefär 27/7"
  )
  markers.push(ritsemCheckpoint)
  ritsemCheckpoint.addTo(map)

  const abiskoGoal = L.marker([68.3585082424416, 18.783667012329545], {
    icon: GoalIcon,
  })
  abiskoGoal.bindPopup(
    "<b>Abisko</b><br /><br />Woho, mål! Här borde jag vara senast 2/8"
  )
  markers.push(abiskoGoal)
  abiskoGoal.addTo(map)

  return markers
}
