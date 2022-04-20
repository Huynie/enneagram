import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential, OAuthProvider } from 'firebase/auth';
import * as Crypto from 'expo-crypto';
import * as AppleAuthentication from 'expo-apple-authentication';
import { db, auth } from '../firebaseConfig/config';
import { useNavigation } from '@react-navigation/core';

WebBrowser.maybeCompleteAuthSession();

const useProviderSignIn = () => {
  const navigation = useNavigation();

  const googleSignIn = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
        clientId: '1096010449978-n5hbaiogph2ub4g0pug5g9e3ato2l0im.apps.googleusercontent.com',
        },
    );
    React.useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
        .then(() => navigation.navigate('Dashboard'));
      }
    }, [response])
    return { promptAsync, response, request}
  }
  
  const appleSignIn = () => {
    const nonce = Math.random().toString(36).substring(2, 10);

    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
    .then((hashedNonce) =>
      AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ],
        nonce: hashedNonce
      })
    )
    .then((appleCredential) => {
      const { identityToken } = appleCredential;
      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
          idToken: identityToken,
          rawNonce: nonce
      });
      return signInWithCredential(credential);
      // Successful sign in is handled by firebase.auth().onAuthStateChanged
    })
    .catch((error) => {
        // ...
    });
  };

  const facebookSignIn = () => {
    console.log('signed in with facebook')
  }

  const githubSignIn = () => {
    console.log('signed in with github')
  }

  return {
    google: googleSignIn().promptAsync,
    apple: appleSignIn,
    facebook: facebookSignIn,
    github: githubSignIn
  };
}

export default useProviderSignIn;

export const googleSignIn = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '1096010449978-n5hbaiogph2ub4g0pug5g9e3ato2l0im.apps.googleusercontent.com',
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);
  return promptAsync
};
