import React, {useContext, useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { CurrentUserContext } from '../context/contexts';
import {selectMemory, getCurrentLatLong} from '../helpers/helpers';

// Map component on main screen
const Map = ({ memory_locations, navigation  }) => {

    // each time memory location changes, update
    useEffect(() => {}, [memory_locations])

    // check that memory_locations is not empty. If it is then display  
    // as message that there was no (item of interest as defined in the context)

    // goal: start at current location as default. (move get current location to a helper function)

    // set initial default region
    const getInitRegion = () => {
        const {lat, long} = getCurrentLatLong();
        return {
            latitude: 42.7328086,
            longitude: -73.685083,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }
    }

    const default_testing_address_image = 'https://www.rd.com/wp-content/uploads/2018/02/30_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_124167640_YamabikaY.jpg?fit=700%2C467'

    const { mapView, setCurrentMemoryDetails, setDisplayMemoryDetails } = useContext(CurrentUserContext);

    // if location services are enabled, set the default region to the current device's location.
    return <View style={styles.container}>
        <MapView
            ref={mapView}
            initialRegion={getInitRegion()}
            style={styles.map}
            accessibilityLabel='Main map'
            >

            {// Draw Memories on map
                memory_locations.map((marker, index) =>
                (<Marker
                    key={index}
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    title={marker.title}
                    icon={require('../../assets/marker_image.png')}

                    // image={{ uri: '../../assets/marker_image.png' }}
                    
                    onPress={()=> {
                        selectMemory(mapView,
                            marker.id, 
                            setCurrentMemoryDetails, 
                            setDisplayMemoryDetails, 
                            marker.latitude, 
                            marker.longitude)}}
                > 
                {/* <Image source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}/> */}
                   <Image source={require('../../assets/marker_image.png')} style={{height: 35, width:35 }} />
                  </Marker>
                  
                  ))
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