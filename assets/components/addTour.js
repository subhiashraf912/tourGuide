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
import 'firebase/firestore';
import * as  ImagePicker from 'expo-image-picker';


export default class AddTour extends React.Component {

    state = {
        name: '',
        imgURL: null

    }



    sendToDataBase = () => {
        console.log("in Sending to Database");
        var uri = this.state.imgURL
        console.log('uri: ' + uri)
        var date = Date();
        if (uri != null) {
            firebase
                .database()
                .ref("Tours")
                .push({
                    user: firebase.auth().currentUser.displayName,
                    userImg: firebase.auth().currentUser.photoURL,
                    places: this.state.places,
                    prise: this.state.userPrise,

                    uri: uri,
                    date:
                        new Date().getHours() +
                        ":" +
                        new Date().getMinutes() +
                        ":" +
                        new Date().getSeconds() +
                        " " +
                        new Date().getDate() +
                        "/" +
                        new Date().getMonth() +
                        "/" +
                        new Date().getFullYear(),
                })
                .then(() => {
                    alert("Tour Added");
                });
        } else {
            console.log('uri is null sending without image')
            console.log(this.state.userPrise)
            console.log(this.state.places)
            console.log(firebase.auth().currentUser.displayName)
            console.log(firebase.auth().currentUser.photoURL)

            firebase
                .database()
                .ref("Tours")
                .push({
                    user: firebase.auth().currentUser.displayName,
                    userImg: firebase.auth().currentUser.photoURL,
                    places: this.state.places,
                    prise: this.state.userPrise,

                    date:
                        new Date().getHours() +
                        ":" +
                        new Date().getMinutes() +
                        ":" +
                        new Date().getSeconds() +
                        " " +
                        new Date().getDate() +
                        "/" +
                        new Date().getMonth() +
                        "/" +
                        new Date().getFullYear()
                })
                .then(() => {
                    alert("Tour Added without image");
                });
        }
    };


    handelChoosePhoto = async () => {
        //TO OPEN CAMERA
        // let res = await ImagePicker.launchCameraAsync();
        //TO SELLECT EXIST IMAGE ON UR DEVICE:D
        let res = await ImagePicker.launchImageLibraryAsync();


        if (!res.cancelled) {
            console.log('handlingUpload')
            upload = this.uploadImage(res.uri)
                .then(() => {
                    alert('success')
                    //                   console.log(upload)

                })
                .catch((error) => {
                    alert(error);
                })
        }

    };

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child('images/' + imageName);
        console.log('ref.put(blob)')
        console.log(ref)
        var uploadTask = ref.put(blob).then(snapshot => {
            var DownloadURL = snapshot.ref.getDownloadURL().then((DownloadURL) => {
                console.log(DownloadURL)
                console.log("Done")
                this.setState({ imgURL: DownloadURL })
            })

        })


    }

    handleDone = () => {
        console.log(this.state.places)
        console.log(this.state.userPrise)
    }

    render() {
        return (
            <View style={styles.container}>


                <TextInput
                    style={styles.BigInput}
                    placeholder='Enter the places you offer:'
                    onChangeText={text => {
                        this.setState({ places: text });
                    }}
                    multiline
                />

                <View style={styles.priseStyle}>
                    <TextInput
                        style={styles.Inputs}
                        placeholder='Enter the prise you want:'
                        multiline
                        onChangeText={text => {
                            this.setState({ userPrise: text });
                        }}
                        keyboardType={'numeric'}
                    />
                    <Text>$</Text>
                </View>

                <Text>Upload images"SOON"</Text>
                <Button title='upload Image' onPress={this.handelChoosePhoto} />
                <Button
                    title='DONE'
                    onPress={this.sendToDataBase}

                />

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




