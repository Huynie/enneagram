import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider
} from '@firebase/auth';
import { db, auth } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc,arrayUnion, arrayRemove } from "firebase/firestore/lite";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

const OauthButtons = ({navigation}) => {
  // const googleSignIn =  async() => {
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();
  
  //   // Create a Google credential with the token
  //   const googleCredential = GoogleAuthProvider.credential(idToken);
  
  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  // }

  const signInWith = async (company) => {
    // let provider;
    // switch(company) {
    //   case 'google':
    //     provider =  googleSignIn;
    //     break;
    //   case 'facebook':
    //     provider =  FacebookAuthProvider;
    //     break;
    //   case 'github':
    //     provider =  GithubAuthProvider;
    //     break;
    //   case 'apple':
    //     provider =  GithubAuthProvider;
    //     break;
    //   default:
    //     provider =  GoogleAuthProvider;
    //     break;
    // };

    console.log(company);
  }
  return (
    <View style={{padding: 10, justifyContent: 'space-between', height: 250}}>
      <View style={{borderColor: 'gray', borderWidth: 0.5, width: 250, alignSelf: 'center'}}/>
      <Text style={{color: 'gray', fontSize: 16, marginVertical: 10, alignSelf: 'center'}}>or continue with</Text>
      <Button
        title="google"
        backgroundColor='red'
        textStyle={styles.OauthButtonText}
        containerStyle={styles.OauthButtonContainer}
        onPress={() => signInWith('google')}
      />
      <Button
        title="facebook"
        backgroundColor='blue'
        textStyle={styles.OauthButtonText}
        containerStyle={styles.OauthButtonContainer}
        onPress={() => signInWith('facebook')}
      />
      <Button
        title="github"
        backgroundColor='black'
        containerStyle={styles.OauthButtonContainer}
        textStyle={styles.OauthButtonText}
        onPress={() => signInWith('github')}
      />
      <Button
        title="apple"
        backgroundColor='black'
        containerStyle={styles.OauthButtonContainer}
        textStyle={styles.OauthButtonText}
        onPress={() => signInWith('apple')}
      />
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  OauthButtonContainer:{
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 250,
    alignSelf: 'center'
  },
  OauthButtonText:{
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 10,
    textTransform: 'capitalize'
  }
})

export default OauthButtons;