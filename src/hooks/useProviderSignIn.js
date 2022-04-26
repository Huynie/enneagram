import React from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery
} from 'expo-auth-session';
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
  linkWithRedirect,
  getRedirectResult,
  signInWithRedirect
} from 'firebase/auth';
import * as Crypto from 'expo-crypto';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useNavigation } from '@react-navigation/core';

WebBrowser.maybeCompleteAuthSession();

const useProviderSignIn = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '1096010449978-n5hbaiogph2ub4g0pug5g9e3ato2l0im.apps.googleusercontent.com',
      redirectUri: makeRedirectUri({useProxy: true})
    },
  );
  const firebaseSignIn = (responseData, provider) => {
    if (responseData?.type === 'success') {

      const credentialFromProvider = (() => {
        switch (provider) {
          case 'google':
            const {id_token} = responseData.params;
            return GoogleAuthProvider.credential(id_token);
          case 'facebook':
            const {access_token} = responseData.params;
            return FacebookAuthProvider.credential(access_token);
          case 'github':
            const token = responseData.access_token;
            console.log(token)
            return GithubAuthProvider.credential(token);
          default: null
            break;
        }
      })();
      
      signInWithCredential(auth, credentialFromProvider)
      .then((res) => {
        navigation.navigate('Dashboard');
        console.log('This log is from before error is caught. Why?')
      })
      .catch(error => {
        console.log("Sign In Error: ", error.code, error.customData)
        if(error.code === 'auth/account-exists-with-different-credential') {
          const errorEmail = error.customData.email;
          // const errorCredential = OAuthProvider.credentialFromError(error);
          fetchSignInMethodsForEmail(auth, errorEmail)
          .then( providers => {
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
                const credential = new GoogleAuthProvider.credential(id_token);
                signInWithCredential(auth, credential)
                // .then((user) => {
                //   navigation.navigate('Dashboard');
                // })
                // .catch(err => console.log("Google Sign In Error: ", err.code));
                linkWithRedirect(auth.currentUser , new FacebookAuthProvider)
                .then(() => console.log('Linked User'))
                .catch(err => console.log("Link Error: ", err.code));
                getRedirectResult(auth).then((result) => {
                  const credential = GoogleAuthProvider.credentialFromResult(result);
                  if (credential) {
                    // Accounts successfully linked.
                    const user = result.user;
                    console.log("successfully linked!", user)
                  }
                }).catch((error) => {
                  console.log("Get result Error: ", error.code)
                });
              };
            }
          });
        }
      });
    }
  }

  
  const googleSignIn = () => {
    React.useEffect(() => {
      firebaseSignIn(response, 'google');
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
      redirectUri: makeRedirectUri({useProxy: true})
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
        // clientId: '627c32a5eb9f8f40f41f',
        // clientSecret: 'fc0b377d2e17ddfa5779f70391be9146a12aa795',
        //EN-GRAM MOBILE
        clientId: '6dd4f8114a6461626c93',
        clientSecret: 'fd1cca3bd1471802cc0abf8eefcb929f50695aa5',
        scopes: ['user:email'],
        // redirectUri: 'huynie-gram://'
        redirectUri: makeRedirectUri({useProxy: true}),
      },
      discovery
    );
    React.useEffect(() => {
      if(response?.type === "success") {
        const data = {
          client_id: '627c32a5eb9f8f40f41f',
          client_secret: 'fc0b377d2e17ddfa5779f70391be9146a12aa795',
          code: response.params.code
        }
        fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }, 
          body: JSON.stringify(data),
          
        })
        .then(res => res.json())
        .then(res => {
          const resData = {
            type: 'success',
            ...res
          }
          firebaseSignIn(resData, 'github');
        })
        .catch(err => console.log(err));

        // console.log("github logged in! ", response);
      }
    }, [response]);
    
    return { promptAsync, request, response}
  }

  return {
    google: googleSignIn().promptAsync,
    apple: appleSignIn,
    facebook: facebookSignIn().promptAsync,
    github: githubSignIn().promptAsync
  };
}

export default useProviderSignIn;