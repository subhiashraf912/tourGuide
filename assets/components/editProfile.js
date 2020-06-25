import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    CameraRoll,
    TouchableOpacity
} from "react-native";
import uuid from "uuid";
import { white } from "color-name";
import { createStackNavigator } from 'react-navigation';
import * as firebase from "firebase";



export default class EditProfile extends React.Component {

    state = {
        name: '',
        phoneNumber: '',
        email: '',
        password: ''
    };
    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('EditName')
                    }}>
                    <View style={styles.viewBorder}>
                        <Text style={styles.txt}>Edit your name</Text>
                    </View>

                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Verify', { ver: 'EditEmail' })
                    }}
                >
                    <View style={styles.viewBorder}>
                        <Text style={styles.emailTxt}>Edit your email</Text>
                    </View></TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('EditPhone')
                    }}
                >
                    <View style={styles.viewBorder}>
                        <Text style={styles.txt}>Edit your phone number</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Verify', { ver: 'EditPassword' })
                    }}
                >
                    <View style={styles.viewBorder}>
                        <Text style={styles.txt}>Change your password</Text>
                    </View>
                </TouchableOpacity>



                <Button title='Back to previos page'
                    onPress={() => {
                        this.props.navigation.navigate('Profile')
                    }} />


                {/* <TextInput
                    onChangeText={text => {
                        this.setState({ fName: text });
                    }}

                    style={styles.inputs} placeholder='Enter your first name...' /> */}



            </View>
        );
    }
}


const styles = StyleSheet.create({
    txt: {
        fontSize: 25,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    container: {
        padding: 30,
        backgroundColor: 'white',
        flex: 1,
    },
    emailTxt: {
        fontSize: 25,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    viewBorder: {
        margin: 10,
        borderWidth: 2,
        backgroundColor: '#bdc3c7'
    },

    whiteTxt: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    Btn: {
        margin: 8
    },
    inputs: {
        textAlign: "center",
        margin: 5,
        height: 30,
        width: 250,
        borderColor: "black",
        borderWidth: 2,
        color: "black",
        borderRadius: 20
    },

});
