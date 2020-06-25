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
import 'firebase/firestore';


export default class ShowTour extends React.Component {
    state = {

    }







    componentDidMount = () => {
        this.setState({
            userImg: this.props.navigation.getParam('userImg'),
            date: this.props.navigation.getParam('date'),
            places: this.props.navigation.getParam('places'),
            user: this.props.navigation.getParam('user'),
            tourImg: this.props.navigation.getParam('tourImg'),
            prise: this.props.navigation.getParam('prise')

        })
    }





    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        source={{ uri: this.state.userImg }}
                    />
                    <Text style={{ fontSize: 30, marginLeft: 10 }}>
                        {this.state.user}
                    </Text>



                </View>

                <Text>Date: {this.state.date}</Text>
                <Text>Tour Prise: {this.state.prise}</Text>
                <Text>Tour places: {this.state.places}</Text>
                <Image
                    style={{ width: 250, height: 250, borderRadius: 20, margin: 10 }}
                    source={{ uri: this.state.tourImg }}
                />

                <Button title='Back to previos page'
                    style={{ margin: 10, padding: 10 }}
                    onPress={() => {
                        this.props.navigation.navigate('LatestTours')
                    }} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 40,
        backgroundColor: "white",
        alignItems: "center",

    },
    inlineView: {
        flexDirection: 'row',
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        margin: 10
    },

    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 10
    },
    editBtn: {
        margin: 50,
        backgroundColor: 'red'
    },
    defTxt: {
        fontSize: 24,
        margin: 10
    },
    BigInput: {
        margin: 10,
        fontSize: 15,
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
        height: 140
    },
    priseStyle: {

    },
    Inputs: {
        margin: 10,
        fontSize: 15,
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
        height: 40
    },
    VtoRow: {
        flex: 1 / 4,
        flexDirection: "row"
    },
    Btn: {
        margin: 8
    },

});




