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
export default class Profile extends React.Component {
    state = {}
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
        // console.log('ref.put(blob)')
        // console.log(ref)
        var uploadTask = ref.put(blob).then(snapshot => {
            var DownloadURL = snapshot.ref.getDownloadURL().then((DownloadURL) => {
                // console.log(DownloadURL)
                // console.log("Done")
                this.ChangePFP(DownloadURL)
            })

        })


    }
    ChangePFP = (Link) => {
        console.log("Link " + Link)
        var userNow = firebase.auth().currentUser
        userNow.updateProfile({
            photoURL: Link,
        }).then(function () {
            var displayName = userNow.displayName;
            var photoURL = userNow.photoURL;
            console.log(photoURL)
        })
    }


    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity

                    onPress={this.handelChoosePhoto}

                >

                    <Image
                        style={styles.logo}
                        source={{
                            uri: firebase.auth().currentUser.photoURL,
                        }}
                    />



                </TouchableOpacity>


                <Text style={styles.defTxt}>{firebase.auth().currentUser.displayName}</Text>


                <Text >Email: {firebase.auth().currentUser.email}</Text>


                <Text >Phone number: {firebase.auth().currentUser.phoneNumber}</Text>



                <Button style={styles.editBtn}
                    onPress={() => {
                        this.props.navigation.navigate('EditProfile')
                    }}


                    title='Edit profile' />
                <Button style={styles.editBtn}
                    onPress={() => {



                        firebase.auth().signOut()



                    }}


                    title='Sign out' />



            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
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




