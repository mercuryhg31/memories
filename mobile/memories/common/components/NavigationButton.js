import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


const NavigationButton = ({ navigation, navigateTo, label }) => {
    return <View>
        <TouchableOpacity style={styles.btn}
            // replace with help screen
            onPress={() => navigation.navigate(navigateTo)}> 
            <Text style={{ padding: 10 }}>{label}</Text>
        </TouchableOpacity>
    </View>
};



const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#dba7c3",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        width: 'auto'
    },
});


export default NavigationButton;