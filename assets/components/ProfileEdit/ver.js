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



export default class Verify extends React.Component {




    state = {
        Email: "",
        password: "",
        toNavigate: ''
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.whiteTxt}>this operation is very sensitive, verify yourself to update your data</Text>
                <TextInput
                    secureTextEntry={true}
                    onChangeText={text => {
                        this.setState({ password: text });

                    }}

                    style={styles.inputs} placeholder='Enter your password...' />
                <Button title='Verify'
                    onPress={() => {
                        console.log(this.state.Email)
                        console.log(this.state.password)
                        let email = this.state.Email
                        let password = this.state.password
                        verifyType = this.props.navigation.getParam('ver')
                        console.log(verifyType)
                        this.setState({ toNavigate: verifyType })


                        if (email == '') {
                            if (password != '') {


                                firebase
                                    .auth()
                                    .signInWithEmailAndPassword(firebase.auth().currentUser.email, password)
                                    .then(() => {
                                        console.log("to navigate");
                                        console.log(this.state.email);

                                        this.props.navigation.navigate(this.state.toNavigate);
                                    })
                                    .catch(error => {
                                        var errorCode = error.code;
                                        var errorMessage = error.message;
                                        console.log(error);
                                        console.log(errorCode)
                                        if (errorCode == 'auth/invalid-email') {
                                            alert('Your Email is badly formatted!!, Please enter a valid email address!!!')
                                        }
                                        if (errorCode == 'auth/user-not-found') {
                                            alert('this email address is not used yet... you can create one by pressing sign up button.')
                                        }

                                        if (errorCode == 'auth/wrong-password') {
                                            alert('You entered a wrong password. check the email and password you entered')
                                        }
                                    });




                            }
                            else {
                                alert('Enter your pasword!!!')
                            }
                        }

                        else {
                            alert('Enter your email and pasword!!!')
                        }


                        // this.props.navigation.navigate('Home')
                    }

                    }
                />




            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2c3e50",
        justifyContent: "center",
        alignItems: "center"
    },

    whiteTxt: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 20
    },

    emailTxt: {
        fontSize: 12,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
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
        color: "white",
        borderRadius: 20
    },

});
