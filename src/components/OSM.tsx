import Leaflet from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// https://zenn.dev/takaki/articles/react-leaflet-with-nextjs-router

Leaflet.Marker.prototype.options.icon = Leaflet.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

const OSM = (props: {
  position: { lng: number; lat: number };
  epicenterPosition: { lng: number; lat: number };
  markers: { key: string; lng: number; lat: number; title: string }[];
  zoom?: number;
}): JSX.Element => {
  return (
    <div>
      <Map
        center={[props.position.lat, props.position.lng]}
        zoom={props.zoom || 13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[props.epicenterPosition.lat, props.epicenterPosition.lng]}
        >
          <Popup>
            震源 lng: {props.epicenterPosition.lng}, lat:{' '}
            {props.epicenterPosition.lat}
          </Popup>
        </Marker>
        {props.markers.map((marker) => (
          <Marker key={marker.key} position={[marker.lat, marker.lng]}>
            <Popup>{marker.title}</Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default OSM;
