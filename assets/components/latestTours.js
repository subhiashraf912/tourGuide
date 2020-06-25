import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
export default class LatestTours extends React.Component {
    state = {
        tours: []
    };

    componentWillMount() {
        firebase
            .database()
            .ref("Tours")
            .on("value", snapshot => {
                const tours = snapshot.val();
                // console.log(tours);
                var toursList = [];
                for (const key in tours) {
                    var tour = tours[key];

                    toursList.push(tour);
                }
                this.setState({ tours: toursList });
            });
    }
    render() {
        return (
            <View style={(styles.container, { borderWidth: 0 })}>
                <Text style={{ fontSize: 30, color: "black" }}>Lasttours</Text>
                <Button title='Add tour'
                    onPress={() => {
                        this.props.navigation.navigate('AddTour')
                    }
                    } />

                <FlatList
                    data={this.state.tours}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={item => {
                        // console.log("item", item);
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("ShowTour", {
                                        user: item.item.user,
                                        date: item.item.date,
                                        places: item.item.places,
                                        prise: item.item.prise,
                                        userImg: item.item.userImg,
                                        tourImg: item.item.uri
                                    });

                                    // console.log(item.item)
                                }}
                            >
                                <View style={styles.container}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image
                                            style={{ width: 50, height: 50, borderRadius: 50 }}
                                            source={{ uri: item.item.userImg }}
                                        />
                                        <Text style={{ fontSize: 15, marginLeft: 10, }}>
                                            {item.item.user}
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 20 }}>
                                        {item.item.date}
                                    </Text>
                                    <Image
                                        style={{ width: 150, height: 150, borderRadius: 10 }}
                                        source={{ uri: item.item.uri }} />
                                    {/* <Image
										style={styles.Image}
										source={{ uri: item.item.uri }}
									/> */}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                ></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "grey",
        marginTop: 25,
        marginBottom: 40,
        padding: 20
    },
    Image: {
        height: 250,
        width: 320,
        borderRadius: 50 / 2
    }
});
