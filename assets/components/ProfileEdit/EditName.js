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
import { red } from "color-name";


export default class EditName extends React.Component {

    state = { name: '' }
    render() {
        return (
            <View style={styles.container}>



                <TextInput
                    onChangeText={text => {
                        this.setState({ name: text });
                    }}

                    style={styles.inputs} placeholder='Enter your new name...' />


                <Button style={styles.editBtn}
                    onPress={() => {
                        var userNow = firebase.auth().currentUser;

                        userNow.updateProfile({
                            displayName: this.state.name,
                        })
                        this.props.navigation.navigate('EditProfile')

                    }}


                    title='Done' />


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
    logo: {
        width: 150,
        height: 150,
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
    VtoRow: {
        flex: 1 / 4,
        flexDirection: "row"
    },
    Btn: {
        margin: 8
    },

});




