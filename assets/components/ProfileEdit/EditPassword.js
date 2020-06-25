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


export default class EditPassword extends React.Component {

    state = { password: '' }
    render() {
        return (
            <View style={styles.container}>



                <TextInput
                    secureTextEntry
                    onChangeText={text => {
                        this.setState({ password: text });
                    }}

                    style={styles.inputs} placeholder='Enter your new password...' />


                <Button style={styles.editBtn}
                    onPress={() => {
                        var userNow = firebase.auth().currentUser;

                        userNow.updatePassword(this.state.password)
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




