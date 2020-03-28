import CMS from "netlify-cms-app"
import withMapControl from "../components/netlify-widgets/map/withMapControl"
import MapPreview from "../components/netlify-widgets/map/MapPreview"

const MapControl = withMapControl()
console.log("Register mymap widget!!!! - ", MapControl, " ", MapPreview)

CMS.registerWidget("mymap", MapControl, MapPreview)
