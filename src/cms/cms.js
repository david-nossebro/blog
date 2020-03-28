import CMS from "netlify-cms-app"
import MapControl from "../netlify-cms-widgets/netlify-cms-widget-map/src/withMapControl"
import MapPreview from "../netlify-cms-widgets/netlify-cms-widget-map/src/MapPreview"

CMS.registerWidget("map2", MapControl, MapPreview)
