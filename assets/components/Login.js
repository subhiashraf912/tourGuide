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



export default class Loginscreen extends React.Component {

    state = {
        Email: "",
        password: ""
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.whiteTxt}>Sign in to use our app</Text>
                <TextInput onChangeText={text => {
                    this.setState({ Email: text });
                }}
                    style={styles.inputs} placeholder='Enter your Email...' />
                <TextInput
                    secureTextEntry={true}
                    onChangeText={text => {
                        this.setState({ password: text });
                    }}

                    style={styles.inputs} placeholder='Enter your password...' />
                <Button title='Sign in'
                    onPress={() => {
                        console.log(this.state.Email)
                        console.log(this.state.password)
                        let email = this.state.Email
                        let password = this.state.password


                        if (email != '') {
                            if (password != '') {


                                firebase
                                    .auth()
                                    .signInWithEmailAndPassword(email, password)
                                    .then(() => {
                                        console.log("to navigate");
                                        console.log(this.state.email);

                                        this.props.navigation.navigate("afterLogin");
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

                <Text style={styles.whiteTxt}>don't have an account?</Text>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Signup')
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text>Create one!</Text>
                    </View>
                </TouchableOpacity>


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
