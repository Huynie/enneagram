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

const OauthButtons = ({navigation}) => {
  console.log(navigation);
  const signInWith = async (company) => {
    let provider;
    switch(company) {
      case 'google':
        provider =  GoogleAuthProvider;
        break;
      case 'facebook':
        provider =  FacebookAuthProvider;
        break;
      case 'github':
        provider =  GithubAuthProvider;
        break;
      case 'apple':
        provider =  GithubAuthProvider;
        break;
      default:
        provider =  GoogleAuthProvider;
        break;
    };

    try {
      const res = await signInWithPopup(auth, new provider() );
      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()) {
        const userData = {
          firstName: res.user.displayName,
          lastName: res.user.displayName,
          userName: res.user.displayName,
          email: res.user.email,
          results: [],
        };
        // create new doc in Firebase Firestore database
        await setDoc( docRef, userData );
      }
      // set validation error state to false
      // empty error msg string
      // navigate to dashboard upon success
    } catch (error) {
      // set validation error state to true
      // error msg value = err msg
      console.log(error.code, provider.credentialFromError(error));

      // TO DO: Link providers to same email
      // if (error.code === 'auth/account-exists-with-different-credential') {
      //   // Step 2.
      //   // User's email already exists.
      //   // The pending Google credential.
      //   var pendingCred = error.credential;
      //   // The provider account's email address.
      //   var email = error.email;
      //   // Get sign-in methods for this email.
      //   fetchSignInMethodsForEmail(email).then(function(methods) {
      //     // Step 3.
      //     // If the user has several sign-in methods,
      //     // the first method in the list will be the "recommended" method to use.
      //     if (methods[0] === 'password') {
      //       // Asks the user their password.
      //       // In real scenario, you should handle this asynchronously.
      //       var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
      //       signInWithEmailAndPassword(email, password).then(function(result) {
      //         // Step 4a.
      //         return linkWithCredential(pendingCred);
      //       }).then(function() {
      //         // Google account successfully linked to the existing Firebase user.
      //         goToApp();
      //       });
      //       return;
      //     }
      //     // All the other cases are external providers.
      //     // Construct provider object for that provider.
      //     // TODO: implement getProviderForProviderId.
      //     var provider = getProviderForProviderId(methods[0]);
      //     // At this point, you should let the user know that they already have an account
      //     // but with a different provider, and let them validate the fact they want to
      //     // sign in with this provider.
      //     // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
      //     // so in real scenario you should ask the user to click on a "continue" button
      //     // that will trigger the signInWithPopup.
      //     signInWithPopup(provider).then(function(result) {
      //       // Remember that the user may have signed in with an account that has a different email
      //       // address than the first one. This can happen as Firebase doesn't control the provider's
      //       // sign in flow and the user is free to login using whichever account they own.
      //       // Step 4b.
      //       // Link to Google credential.
      //       // As we have access to the pending credential, we can directly call the link method.
      //       linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
      //         // Google account successfully linked to the existing Firebase user.
      //         goToApp();
      //       });
      //     });
      //   });
      // }

    }
  }
  return (
    <View style={{padding: 10, justifyContent: 'space-between', height: 250}}>
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