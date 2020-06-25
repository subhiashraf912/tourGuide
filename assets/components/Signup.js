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



export default class Signup extends React.Component {

    state = {
        Email: "",
        password: "",

    };
    render() {
        return (
            <View style={styles.container}>




                <Text style={styles.whiteTxt}>Sign up to use our app</Text>


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
                <Button title='Sign up'
                    onPress={() => {
                        console.log(this.state.Email)
                        console.log(this.state.password)
                        let email = this.state.Email
                        let password = this.state.password
                        let Name = this.state.fName + ' ' + this.state.lName


                        if (email != '') {
                            if (password != '') {


                                firebase.auth()
                                    .createUserWithEmailAndPassword(email, password)



                                    .catch(error => {
                                        // Handle Errors here.
                                        var errorCode = error.code;
                                        var errorMessage = error.message;
                                        console.log(error.code);
                                        if (errorCode === "auth/email-already-in-use") {
                                            console.log("sign in ");
                                            console.log("hello ", email, password);

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
                                                });
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

                <Text style={styles.whiteTxt}>already have an account?</Text>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Login')
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text>Sign in</Text>
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
    VtoRow: {
        flex: 1 / 4,
        flexDirection: "row"
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
