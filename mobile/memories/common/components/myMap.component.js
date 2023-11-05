import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';


const MyMap = ({ memory_locations }) => {
  const initialRegion = {
    latitude: 42.729268,
    longitude: -73.681227,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  return <View style={styles.container}>
    <MapView
      initialRegion={initialRegion}
      style={styles.map}>

    {/* Draw Memories on map*/
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
    flex: 3,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MyMap;