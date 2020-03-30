import * as geojson from "geojson"

export default abstract class GeoJson implements geojson.GeoJsonObject {
  type:
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection"
    | "Feature"
    | "FeatureCollection"
  bbox?: geojson.BBox
  constructor(geoJson: any) {
    this.type = geoJson.type
    this.bbox = geoJson.bbox
  }

  // TODO: Implement getBounds for all types
  abstract getBounds(): Array<geojson.Position>

  static fromGeoJson(geoJson: any): GeoJson {
    if (!geoJson.type) {
      console.log("Typeof: ", typeof geoJson)
      console.log(
        "GeoJson object provided is missing 'type' property: ",
        geoJson
      )
      throw new Error("GeoJson object provided is missing 'type' property.")
    }

    switch (geoJson.type) {
      case "Point":
        return new Point(geoJson)
      case "MultiPoint":
        return new MultiPoint(geoJson)
      case "LineString":
        return new LineString(geoJson)
      case "MultiLineString":
        return new MultiLineString(geoJson)
      case "Polygon":
        return new Polygon(geoJson)
      case "MultiPolygon":
        return new MultiPolygon(geoJson)
      case "GeometryCollection":
        return new GeometryCollection(geoJson)
      case "Feature":
        return new Feature(geoJson)
      case "FeatureCollection":
        return new FeatureCollection(geoJson)
      default:
        console.log(
          `Unsupported type '${geoJson.type}' found in GeoJson object: ${geoJson}`
        )
        throw new Error(
          `Unsupported type '${geoJson.type}' found in GeoJson object`
        )
    }
  }

  static createGeometry(
    geoJson: any
  ):
    | Point
    | MultiPoint
    | LineString
    | MultiLineString
    | Polygon
    | MultiPolygon
    | GeometryCollection {
    if (!geoJson.type) {
      console.error(
        `Feature 'geometry' is missing mandatory field 'type': ${geoJson}`
      )
      throw new Error(
        `Feature 'geometry' is missing mandatory field 'type': ${geoJson}`
      )
    }

    switch (geoJson.geometry.type) {
      case "Point":
        return new Point(geoJson)
      case "MultiPoint":
        return new MultiPoint(geoJson)
      case "LineString":
        return new LineString(geoJson)
      case "MultiLineString":
        return new MultiLineString(geoJson)
      case "Polygon":
        return new Polygon(geoJson)
      case "MultiPolygon":
        return new MultiPolygon(geoJson)
      case "GeometryCollection":
        return new GeometryCollection(geoJson)
      default: {
        console.error(
          `Invalid type '${geoJson.geometry.type}' found for geometry: ${geoJson}`
        )
        throw new Error(
          `Invalid type found for geometry: ${geoJson.geometry.type}`
        )
      }
    }
  }
}

export class FeatureCollection extends GeoJson
  implements geojson.FeatureCollection {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "FeatureCollection"
  features: geojson.Feature<geojson.Geometry, { [name: string]: any }>[]
  constructor(geoJson: any) {
    super(geoJson)

    if (geoJson.features) {
      if (!(geoJson.features instanceof Array)) {
        console.log(`Invalid 'features' in FeatureCollenction: ${geoJson}`)
        throw new Error(
          `Invalid 'features' format in FeatureCollenction: ${geoJson.features}`
        )
      }

      this.features = []
      geoJson.features.forEach(f => {
        this.features.push(new Feature(f))
      })
    }
  }
}

export class Feature extends GeoJson implements geojson.Feature {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "Feature"
  geometry:
    | Point
    | MultiPoint
    | LineString
    | MultiLineString
    | Polygon
    | MultiPolygon
    | GeometryCollection
  id?: string | number
  properties: { [name: string]: any }
  constructor(geoJson: any) {
    super(geoJson)

    if (!geoJson.geometry) {
      console.error(`Feature is missing mandatory field 'geometry': ${geoJson}`)
      throw new Error(
        `Feature is missing mandatory field 'geometry': ${geoJson}`
      )
    }

    this.geometry = GeoJson.createGeometry(geoJson.geometry)

    this.id = geoJson.id
    this.properties = geoJson.properties
  }
}

export class GeometryCollection extends GeoJson
  implements geojson.GeometryCollection {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "GeometryCollection"
  geometries:
    | Point[]
    | MultiPoint[]
    | LineString[]
    | MultiLineString[]
    | Polygon[]
    | MultiPolygon[]
  constructor(geoJson: any) {
    super(geoJson)

    if (!geoJson.geometries) {
      console.error(
        `GeometryCollection is missing mandatory field 'geometries': ${geoJson}`
      )
      throw new Error(
        `GeometryCollection is missing mandatory field 'geometries': ${geoJson}`
      )
    }

    if (!(geoJson.geometries instanceof Array)) {
      throw new Error(
        `GeometryCollection property 'geometries' is bad format. Expected Array but got: ${typeof geoJson.geometries}`
      )
    }

    if (geoJson.geometries.length > 0) {
      const type: string = this.getGeometryType(geoJson.geometries)
      switch (type) {
        case "Point":
          this.geometries = this.createGeometryList<Point>(geoJson.geometries)
          break
        case "MultiPoint":
          this.geometries = this.createGeometryList<MultiPoint>(
            geoJson.geometries
          )
          break
      }
    }
  }

  getGeometryType(geometries: Array<any>) {
    // TODO: Check that all geometries is of the same type, otherwise throw error
    return geometries[0].type
  }

  createGeometryList<
    T extends
      | Point
      | MultiPoint
      | LineString
      | MultiLineString
      | Polygon
      | MultiPolygon
      | GeometryCollection
  >(geometries: Array<any>): Array<T> {
    const result: Array<T> = []
    geometries.forEach(g => {
      result.push(GeoJson.createGeometry(g) as T)
    })
    return result
  }
}

export class Point extends GeoJson implements geojson.Point {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "Point"
  coordinates: geojson.Position
  constructor(geoJson: any) {
    super(geoJson)

    if (!geoJson.coordinates) {
      console.error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
      throw new Error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
    }

    this.coordinates = geoJson.coordinates
  }
}

export class MultiPoint extends GeoJson implements geojson.MultiPoint {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "MultiPoint"
  coordinates: geojson.Position[]
  constructor(geoJson: any) {
    super(geoJson)

    if (!geoJson.coordinates) {
      console.error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
      throw new Error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
    }

    this.coordinates = geoJson.coodinates
  }
}

export class LineString extends GeoJson implements geojson.LineString {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "LineString"
  coordinates: geojson.Position[]
  constructor(geoJson: any) {
    super(geoJson)

    if (!geoJson.coordinates) {
      console.error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
      throw new Error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
    }

    this.coordinates = geoJson.coodinates
  }
}

export class MultiLineString extends GeoJson
  implements geojson.MultiLineString {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "MultiLineString"
  coordinates: geojson.Position[][]
  constructor(geoJson: any) {
    super(geoJson)

    if (!geoJson.coordinates) {
      console.error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
      throw new Error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
    }

    this.coordinates = geoJson.coodinates
  }
}

export class Polygon extends GeoJson implements geojson.Polygon {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "Polygon"
  coordinates: geojson.Position[][]
  constructor(geoJson: any) {
    super(geoJson)

    if (!geoJson.coordinates) {
      console.error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
      throw new Error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
    }

    this.coordinates = geoJson.coodinates
  }
}

export class MultiPolygon extends GeoJson implements geojson.MultiPolygon {
  getBounds(): geojson.Position[] {
    throw new Error("Method not implemented.")
  }
  type: "MultiPolygon"
  coordinates: geojson.Position[][][]
  constructor(geoJson: any) {
    super(geoJson)

    if (!geoJson.coordinates) {
      console.error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
      throw new Error(
        `Geometry is missing mandatory field 'coordinates': ${geoJson}`
      )
    }

    this.coordinates = geoJson.coodinates
  }
}
