/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Tmapv2 {
  export class Map {
    constructor(containerId: string, options: MapOptions);
    addListener(event: string, callback: (event: any) => void): void;
  }

  export class LatLngBounds {
    constructor();
    extend(latLng: LatLng): void;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
  }

  export class Marker {
    _marker_data: any;
    constructor(options: MarkerOptions);
    setPosition(latLng: LatLng): void;
    setMap(map: Map | null): void;
  }

  export class Polyline {
    constructor(options: PolylineOptions);
    setMap(map: Map | null): void;
    setPath(path: LatLng[]): void;
  }

  export class Projection {
    static convertEPSG3857ToWGS84GEO(latlng: LatLng): {
      name: string;
      _lat: number;
      _lng: number;
      _object_: any;
    };
  }

  export class Size {
    constructor(width: number, height: number);
  }

  export class Point {
    constructor(x: number, y: number);
  }

  export namespace extension {
    export class TData {
      getAddressFromGeoJson(lat: number, lon: number, optionObj: any, params: any): void;
    }
    export class GeoJSON {
      read(data: any): any;
      drawRoute(map: Map, jsonForm: any, options: any, callback: (e: any) => void): void;
    }
  }

  export interface MarkerOptions {
    position?: LatLng;
    icon?: string;
    iconHTML?: string;
    offset?: Point;
    iconSize: Size;
    map: Map;
    title?: string;
    zIndex?: number;
  }
}
