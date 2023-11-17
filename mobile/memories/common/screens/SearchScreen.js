import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, TextInput, Dimensions } from "react-native";
import { CurrentUserContext } from '../context/contexts';
import { useContext } from 'react';
import SearchButton from '../components/SearchButton';
import { goTo } from '../helpers/helpers';
import {Picker} from '@react-native-picker/picker';
import Dropdown from '../components/Dropdown';
import { getUsersFromSearch } from '../helpers/requestHelpers';

const userMockData = {
    users: [
        {
            username: 'Cheeta',
            userid: '1234'
        },
        {
            username: 'Dratini',
            userid: '3542'
        },
        {
            username: 'ShawnMendez',
            userid: '9999'
        },
    ]
}

const placeMockData = {
    places: [
        {
            title: 'Troy',
            latitude: 42.0,
            longitude: 42.0,
            latitudeDelta: 1.00,
            longitudeDelta: 1.0421,
        },
        {
            title: 'Cali',
            latitude: 100.0,
            longitude: 10.2,
            latitudeDelta: 1.00,
            longitudeDelta: 1.0421,
        },
        {
            title: 'France',
            latitude: 10.2,
            longitude: 42.2,
            latitudeDelta: 1.00,
            longitudeDelta: 1.0421,
        },
    ]
}


const tagMockData = {
    tags: [
        {
            title: '#tag1'
        },
        {
            title: '#tag2'
        },
        {
            title: '#tag3'
        },
    ]
}

export const SearchCriteria = {
    NAME: 'people by name',
    ID: 'people by ID',
    PLACE: 'places',
    TAG: 'tags'
}

const SearchScreen = ({ navigation }) => {

    // CONTEXTS:
    const { mapView, setDisplayUser, setDisplayMemoryDetails, setTargetUserUID } = useContext(CurrentUserContext);

    const [searchCriteria, setSearchCriteria] = useState(SearchCriteria.NAME);
    const [searchText, setSearchText] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [searchButtonPressed, setSearchButtonPressed] = useState(false);

    // USE EFFECTS
    useEffect(() => {
        console.log('update query: ' + searchText)
    }, [searchText]);
    
    const fetchUsers = (searchString) => {

        // get the latest users by username, then render
        getUsersFromSearch(searchString).then((response) => {

            if(response.search_worked){

                    setUsersList(response.users_list);
            }else{
                console.log('there was an error with the search')
            }


        }).catch((err) => {console.log('there was an error', err)})


    }


    // COMPONENTS



    // A button for selecting a search criteria
    const SelectFocusButton = ({criteriaName}) => {
        return (
            <TouchableOpacity style={styles.btnContainer}
            onPress={() => {setSearchCriteria(criteriaName)}}>
                <Text>{criteriaName}</Text>
            </TouchableOpacity>
        )
    }

    // returns an instance of a user to be displayed as a search option
    const userDetails = (username, userId) => { // TODO request info based on id
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setTargetUserUID(userId);
                    setDisplayUser(true);
                    setDisplayMemoryDetails(false);
                    navigation.navigate('MainScreen');
                }}
            >
                <Image style={styles.icon} />
                <Text
                    style={styles.itemtext}
                >
                    {username}#{userId}
                </Text>
            </TouchableOpacity>
        );
    }

    // returns a list of user instances to select to be displayed
    const SearchUsersView = () => {
        return (
            <View style={styles.criteria_view}>
                <FlatList
                    data={userMockData.users}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        userDetails(item.username, item.userid)
                    )}>
                </FlatList>

            </View>);
    };

    // returns an instance of a place to be displayed as a search option
    const placeDetails = (localizedName, lat, long, latDelta = 0, longDelta = 0) => { // TODO request info based on id
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setDisplayUser(false);
                    console.log(lat, long)
                    goTo(mapView, lat, long);
                    navigation.navigate('MainScreen');
                }}>
                <Image style={styles.icon} />
                <Text style={styles.itemtext}>
                    {localizedName}
                </Text>
            </TouchableOpacity>
        );
    }

    // returns a list of places instances to select to be displayed
    const SearchPlacesView = () => {
        return (
            <View style={styles.criteria_view}>
                <FlatList
                    data={placeMockData.places}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        placeDetails(item.latitude, item.longitude)
                    )}>
                </FlatList>
            </View>);
    };

    // returns an instance of a user to be displayed as a search option
    const tagDetails = (tagTitle) => { // TODO request info based on id
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setDisplayUser(false);
                    navigation.navigate('MainScreen');
                }}>
                <Image style={styles.icon} />
                <Text
                    style={styles.itemtext}
                >
                    {tagTitle}
                </Text>
            </TouchableOpacity>
        );
    }

    // returns a list of user instances to select to be displayed
    const SearchTagsView = () => {
        return (
            <View style={styles.criteria_view}>
                <FlatList
                    data={tagMockData.tags}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        tagDetails(item.title)
                    )}>
                </FlatList>

            </View>);
    };

    const DisplayBasedOnCriteria = () => {

        switch (searchCriteria) {
            case SearchCriteria.NAME:
                return (<SearchUsersView/>);
            case SearchCriteria.ID:
                return (<SearchUsersView/>);
            case SearchCriteria.PLACE:
                return (<SearchPlacesView/>);
            case SearchCriteria.TAG:
                return (<SearchTagsView/>);
            default:
                return (<SearchUsersView/>);
        }
    };

    const data = [
        {label: SearchCriteria.NAME, value: SearchCriteria.NAME},
        {label: SearchCriteria.ID, value: SearchCriteria.ID},
        {label: SearchCriteria.PLACE, value: SearchCriteria.PLACE},
        {label: SearchCriteria.TAG, value: SearchCriteria.TAG},
    ];


    return (
        <SafeAreaView style={styles.modal}>
            <View style={styles.topRow}>
                <TextInput
                    style={styles.input_alt}
                    placeholder='What are you looking for?'
                    onChangeText={newText => setSearchText(newText)}
                    onSubmitEditing={() => {
                        // TODO send request to search for stuff
                        setSearchButtonPressed(false);// to have on effect run 
                        setSearchButtonPressed(true);
                        console.log('HI!');
                    }} />
                <Dropdown preLabel="Searching for" label="..." data={data} onSelect={setSearchCriteria}/>
            </View>

            <View style={styles.content}>
                {/* set view to be conditional set by searchCriteria*/}
                {/* <SearchPlacesView/> */}
                <DisplayBasedOnCriteria/>
            </View>

        </SafeAreaView>
    );
}


const vw = Dimensions.get('window').width;

const styles = StyleSheet.create({
    searchingLine: {
        flexDirection: 'row',
        left: '10%',
        width: '80%',
        top: 75,
        backgroundColor: 'cyan',
    },
    btn: {
        backgroundColor: 'lime',
        left: 10
    },
    input: {
        // borderWidth: 1,
        width: '70%',
        fontSize: 15,
        backgroundColor: 'azure',
        left: 0
    },
    modal: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },
    content: {
        top: 10,
        left: '10%',
        width: '80%',
        display: 'flex',
    },
    item: {
        flexDirection: 'row',
        margin: 8,
        borderRadius: 12 / 1.25,
        backgroundColor: '#ededed'

    },
    itemtext: {
        fontSize: 15,
    },
    icon: {
        backgroundColor: 'purple',
        width: 40, height: 40, // make sure these values are the same
        borderRadius: 50,
    },
    tag: {
        fontSize: 50
    },
    input_alt: {
        flex: 1,
        margin: 12,
        borderBottomWidth: 1,
        borderRadius: 12 / 1.25,
        padding: 10,
        width: '70%'
    },
    select_area_view: {
        flex: 1,
        flexDirection: 'row',
    },
    btnContainer: {
        flex:1,
        width: vw / 4,
        backgroundColor: "#dba7c3",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    criteria: {
        flexDirection: 'row'
    },
    topRow: {
        height: 50,
        width: '100%',
        flexDirection: 'row'
    }

});

export default SearchScreen;