import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import { useStore } from '../store/store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { markerClusterGroup, marker, LatLng } from 'leaflet';

function Map() {
    const store = useStore()
    const position = toJS(store.employee[0])

    const MakerCluster = ({ markers }) => {
        const map = useMap();

        useEffect(() => {
            const mcg = markerClusterGroup();
            mcg.clearLayers();
            markers.forEach((val: any) =>
                marker(new LatLng(val.latitude, val.longitude))
                    .addTo(mcg)
                    .bindPopup(`${val.name}<br />${val.address}<br />${val.city},${val.state}`)
            );
            map.addLayer(mcg);
            return () => {
                map.removeLayer(mcg)
            }
        }, [markers, map])
        return null
    }

    return (
        <MapContainer center={[position.latitude, position.longitude]} zoom={4} scrollWheelZoom={true} style={{ width: '100%', height: '85dvh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MakerCluster markers={store.employee} />
        </MapContainer>
    )
}

export default observer(Map)