import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList,
} from "react-native";
import uuid from "uuid";
import * as firebase from "firebase";


export default class Loading extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Home' : 'Signup')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },

});




