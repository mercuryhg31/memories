import React, {useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

const Map = ({ memory_locations }) => {

    const mapView = React.createRef();

    // TODO get user's current location as initial region
    const [location, setLocation] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const initialRegion = () => {
        const lat = location.coords.latitude;
        return {
            latitude: {},
            longitude: -73.681227,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }

    /* don't worry about this if you see this no you don't
    regionFrom(lat, lon, distance) {
        distance = distance/2
        const circumference = 40075
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000
        const angularDistance = distance/circumference

        const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
        const longitudeDelta = Math.abs(Math.atan2(
                Math.sin(angularDistance)*Math.cos(lat),
                Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

        return result = {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        }
    }
    */

    const goTo = (lat, long, latDelta = 0, longDelta = 0) => {
        const region =  {
            latitude: lat,
            longitude: long,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
        }
        mapView.current.animateToRegion(region, 1000); // args: (region, duration)
    }

    return <View style={styles.container}>
        <MapView
            ref={mapView}
            initialRegion={initialRegion}
            style={styles.map}
            accessibilityLabel='Main map'
            >

            {// Draw Memories on map
                memory_locations.map((marker, index) =>
                (<Marker
                    key={index}
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    title={marker.title}
                />))
            }
        </MapView>
    </View>
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Map;