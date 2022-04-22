import React from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType, makeRedirectUri, useAuthRequest, Prompt } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithCredential,
  OAuthProvider,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  linkWithCredential,
  signInWithRedirect
} from 'firebase/auth';
import * as Crypto from 'expo-crypto';
import * as AppleAuthentication from 'expo-apple-authentication';
import { db, auth } from '../firebaseConfig/config';
import { useNavigation } from '@react-navigation/core';

WebBrowser.maybeCompleteAuthSession();

const useProviderSignIn = () => {
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '1096010449978-n5hbaiogph2ub4g0pug5g9e3ato2l0im.apps.googleusercontent.com',
      },
  );
  const firebaseSignIn = (response2, provider) => {
    if (response2?.type === 'success') {

      const credentialFromProvider = (() => {
        switch (provider) {
          case 'google':
            const {id_token} = response2.params;
            return GoogleAuthProvider.credential(id_token);
          case 'facebook':
            const {access_token} = response2.params;
            return FacebookAuthProvider.credential(access_token);
          case 'github':
            const {code} = response2.params;
            return GithubAuthProvider.credential(code);
          default: null
            break;
        }
      })();
      
      signInWithCredential(auth, credentialFromProvider)
      .then((res) => {
        navigation.navigate('Dashboard');
        console.log(res)
      })
      .catch(error => {
        if(error.code === 'auth/account-exists-with-different-credential') {
          const email = error.customData.email;
          const credential = OAuthProvider.credentialFromError(error);
          // console.log(credential);
          // get provider of existing email
          fetchSignInMethodsForEmail(auth, email)
          .then(async providers => {
            if(providers.indexOf(GoogleAuthProvider.PROVIDER_ID) != -1) {
              console.log('Account already exist as google provider.');

              Alert.alert(
                "Social Sign In",
                "Your account was registered through google, redirecting to google sign in?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: promptAsync }
                ]
              );

              if (response?.type === 'success') {
                const { id_token } = response.params;
                const credential = GoogleAuthProvider.credential(id_token);
                signInWithCredential(auth, credential)
                .then((user) => {
                  linkWithCredential(user ,credential)
                  .then(() => alert('Linked User'))
                  .catch(err => console.log(err.code));
                  navigation.navigate('Dashboard');
                })
                .catch(err => console.log(err.code));
              };
              // signInWithRedirect(new GoogleAuthProvider());
            }
          });
          console.log(error.code)
        }
      });
    }
  }

  
  const googleSignIn = () => {
    React.useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
        .then(() => navigation.navigate('Dashboard'))
        .catch(err => console.log(err.code));
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
    // console.log('signed in with facebook')
    const [request, response, promptAsync] = Facebook.useAuthRequest({
      responseType: ResponseType.Token,
      clientId: '480310646793568',
    });

    React.useEffect(() => {
      firebaseSignIn(response, 'facebook');
      // console.log('facebook logged in! ', response)
    }, [response])

    return { promptAsync, response, request}
  }

  const githubSignIn = () => {
    // console.log('signed in with github')
    const discovery = {
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      revocationEndpoint: 'https://github.com/settings/connections/applications/6dd4f8114a6461626c93',
    };
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: '6dd4f8114a6461626c93',
        scopes: ['identity'],
        redirectUri: 'https://auth.expo.io/@huynie/huynie-gram',
      },
      discovery
    );
  
    React.useEffect(() => {
      // firebaseSignIn(response, 'github');
      // if (response?.type === 'success') {
      //   const { code } = response.params;
      // }
      // console.log("github logged in! ", response);
    }, [response]);
    return { promptAsync, response, request}
  }

  return {
    google: googleSignIn().promptAsync,
    apple: appleSignIn,
    facebook: facebookSignIn().promptAsync,
    github: githubSignIn().promptAsync
  };
}

export default useProviderSignIn;