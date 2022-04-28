import * as React from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
  AccessTokenRequest,
  exchangeCodeAsync,
  // TokenResponse
} from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithCredential,
  fetchSignInMethodsForEmail,
  // OAuthProvider,
  // EmailAuthProvider,
  // linkWithCredential,
  // linkWithRedirect,
  // getRedirectResult,
  // signInWithRedirect
} from 'firebase/auth';
// import * as Crypto from 'expo-crypto';
// import * as AppleAuthentication from 'expo-apple-authentication';
import { useNavigation } from '@react-navigation/core';

WebBrowser.maybeCompleteAuthSession();

const useProviderSignIn = (prov) => {
  const navigation = useNavigation();
  const auth = getAuth();

  // const [provider, setProvider] = React.useState(prov);

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/6dd4f8114a6461626c93',
  };
  const googleAuthRequest = Google.useIdTokenAuthRequest(
    {
      clientId: '1096010449978-n5hbaiogph2ub4g0pug5g9e3ato2l0im.apps.googleusercontent.com',
      redirectUri: makeRedirectUri({useProxy: true})
    },
  );

  const facebookAuthRequest = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '480310646793568',
    redirectUri: makeRedirectUri({useProxy: true})
  });

  const githubAuthRequest = useAuthRequest(
    {
      clientId: '627c32a5eb9f8f40f41f',
      clientSecret: 'fc0b377d2e17ddfa5779f70391be9146a12aa795',
      scopes: ['user:email'],
      redirectUri: "https://auth.expo.io/@huynie/engram",
      responseType: ResponseType.Token
    },
    discovery
  );

  // const [request, response, promptAsync] = (React.useCallback(() => {
  //   switch (provider) {
  //     case 'google':
  //       return googleAuthRequest      
  //     case 'facebook':
  //       return facebookAuthRequest      
  //     case 'github':
  //       return githubAuthRequest      
  //     default:
  //       return null;
  //   }
  // }, [provider]))();
  // console.log(response, promptAsync);

  // React.useEffect(() => {
  //   if(response?.type === "success") {
  //     const credential = credentialFromProvider(provider, response);
  //     firebaseSignIn(credential);
  //   }
  // }, [response])

  const redirectSignIn = (provider) => {
    const [request, response, promptAsync] = (() => {
      switch (provider) {
        case 'google':
          return googleAuthRequest      
        case 'facebook':
          return facebookAuthRequest      
        case 'github':
          return githubAuthRequest      
        default:
          return null;
      }
    })();
    Alert.alert(
      "Social Sign In",
      `Your account was registered through ${provider}, redirecting to ${provider} sign in?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: promptAsync}
      ]
    );
    React.useEffect(() => {
      if(response?.type === 'success') {
        signInWithCredential(auth, credentialFromProvider(provider, response))
        .then(() => {
          navigation.navigate('Dashboard');
          console.log('This log is from before error is caught. Why?')
        })
        .catch(error => {
          console.log("Sign In Error: ", error.code)
        });
      }
    },[response])
  };

  const credentialFromProvider = (provi, response) => {
    switch (provi) {
      case 'google':
        const {id_token} = response.params;
        return GoogleAuthProvider.credential(id_token);
      case 'facebook':
        const {access_token} = response.params;
        return FacebookAuthProvider.credential(access_token);
      case 'github':
        return GithubAuthProvider.credential(response);
      default:
        return null;
    }
  };
  const firebaseSignIn = (credential) => {
    signInWithCredential(auth, credential)
    .then((res) => {
      navigation.navigate('Dashboard');
      console.log('This log is from before error is caught. Why?')
    })
    .catch(error => {
      console.log("Sign In Error: ", error.code);
      if(error?.code === 'auth/account-exists-with-different-credential') {
        const errorEmail = error.customData.email;
        // const errorCredential = OAuthProvider.credentialFromError(error);
        // console.log(errorCredential);
        fetchSignInMethodsForEmail(auth, errorEmail)
        .then( providers => {
          if(providers.indexOf(GoogleAuthProvider.PROVIDER_ID) != -1) {
            redirectSignIn('google');
          }else {
            const nonGoogleProviders = providers.filter(prov => prov !== 'google');
            redirectSignIn(nonGoogleProviders);
          }
        })
      }
    });
  }
  // const appleSignIn = () => {
  //   const nonce = Math.random().toString(36).substring(2, 10);

  //   return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
  //   .then((hashedNonce) =>
  //     AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL
  //       ],
  //       nonce: hashedNonce
  //     })
  //   )
  //   .then((appleCredential) => {
  //     const { identityToken } = appleCredential;
  //     const provider = new OAuthProvider('apple.com');
  //     const credential = provider.credential({
  //         idToken: identityToken,
  //         rawNonce: nonce
  //     });
  //     return signInWithCredential(credential);
  //     // Successful sign in is handled by firebase.auth().onAuthStateChanged
  //   })
  //   .catch((error) => {
  //       // ...
  //   });
  // };
  
  const googleSignIn = () => {
    const [request, response, promptAsync] = googleAuthRequest;
    React.useEffect(() => {
      if(response?.type === "success") {
        const credential = credentialFromProvider('google', response);
        firebaseSignIn(credential);
      }
    }, [response])
    return { promptAsync, response, request}
  }
  
  const facebookSignIn = () => {
    const [request, response, promptAsync] = facebookAuthRequest;
    
    React.useEffect(() => {
      if(response?.type === 'success') {
        const credential = credentialFromProvider('facebook', response);
        firebaseSignIn(credential);
      }
    }, [response])
    
    return { promptAsync, response, request}
  }

  const githubSignIn = () => {
    const [request, response, promptAsync] = githubAuthRequest;
    
    React.useEffect(() => {
      if(response?.type === "success") {  
        const tokenRequest = new AccessTokenRequest({
          clientId: request.clientId,
          clientSecret: request.clientSecret,
          code: response.params.code,
          redirectUri: request.redirectUri,
          scopes: request.scopes,
        }, { tokenEndpoint: discovery.tokenEndpoint });
        const {accessToken} = exchangeCodeAsync(tokenRequest, discovery)
        .then(res => res);
        const credential = credentialFromProvider('github', accessToken);
        firebaseSignIn(credential);
      }
    }, [response]);

    return { promptAsync, response, request }
  }

  return {
    google: googleSignIn().promptAsync,
    facebook: facebookSignIn().promptAsync,
    github: githubSignIn().promptAsync,
    // apple: appleSignIn,
  };

  // return promptAsync
}

export default useProviderSignIn;

// export const useTest = (provider) => {
//   const navigation = useNavigation();
//   const auth = getAuth();
//   const discovery = {
//     authorizationEndpoint: 'https://github.com/login/oauth/authorize',
//     tokenEndpoint: 'https://github.com/login/oauth/access_token',
//     revocationEndpoint: 'https://github.com/settings/connections/applications/6dd4f8114a6461626c93',
//   };
//   const [redirectedProvider, setRedirectedProvider] = React.useState({provider: provider ?? null, redirect: false});

//   const providerAuthRequest = React.useCallback(() => {
//     switch (redirectedProvider.provider) {
//       case 'google':
//         return Google.useIdTokenAuthRequest({
//           clientId: '1096010449978-n5hbaiogph2ub4g0pug5g9e3ato2l0im.apps.googleusercontent.com',
//           redirectUri: makeRedirectUri({useProxy: true})
//         });
//       case 'facebook':
//         return Facebook.useAuthRequest({
//           responseType: ResponseType.Token,
//           clientId: '480310646793568',
//           redirectUri: makeRedirectUri({useProxy: true})
//         });
//       case 'github':
//         return useAuthRequest(
//           {
//             clientId: '627c32a5eb9f8f40f41f',
//             clientSecret: 'fc0b377d2e17ddfa5779f70391be9146a12aa795',
//             scopes: ['user:email'],
//             redirectUri: "https://auth.expo.io/@huynie/engram",
//             responseType: ResponseType.Token
//           },
//           discovery
//         );
//       default: null
//         break;
//     }
//   }, [redirectedProvider])

//   const [request, response, promptAsync] = providerAuthRequest();
//   const test = providerAuthRequest();
//   console.log('test',test[response])

//   const redirectSignIn = React.useCallback(() => {
//     Alert.alert(
//       "Social Sign In",
//       `Your account was registered through ${redirectedProvider.provider}, redirecting to google sign in?`,
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: "OK", onPress: promptAsync}
//       ]
//     );
//   },[redirectedProvider]);

//   React.useEffect(() => {
//     if (redirectedProvider.redirect) {
//       console.log('redirected providers useEffect');
//       redirectSignIn();
//     }
//   },[redirectedProvider])

//   React.useEffect(() => {
//     if(response?.type === "success") {  
//       const credentialFromToken = (() => {
//         switch (redirectedProvider.provider) {
//           case 'google':
//             const {id_token} = response.params;
//             return GoogleAuthProvider.credential(id_token);
//           case 'facebook':
//             const {access_token} = response.params;
//             return FacebookAuthProvider.credential(access_token);
//           case 'github':
//             const TokenRequest = new AccessTokenRequest({
//               clientId: request.clientId,
//               clientSecret: request.clientSecret,
//               code: response.params.code,
//               redirectUri: request.redirectUri,
//               scopes: request.scopes,
//             }, { tokenEndpoint: discovery.tokenEndpoint });
//             const token = exchangeCodeAsync(TokenRequest, discovery)
//             .then(res => res);
//             console.log(token.accessToken)
//             return GithubAuthProvider.credential(token.accessToken);
//           default: null
//             break;
//         }
//       })();

//       signInWithCredential(auth, credentialFromToken)
//       .then((res) => {
//         navigation.navigate('Dashboard');
//         console.log('This log is from before error is caught. Why?')
//       })
//       .catch(error => {
//         console.log("Sign In Error: ", error.code)
//         if(error.code === 'auth/account-exists-with-different-credential') {
//           const errorEmail = error.customData.email;
//           fetchSignInMethodsForEmail(auth, errorEmail)
//           .then( providers => {
//             if(providers.indexOf(GoogleAuthProvider.PROVIDER_ID) != -1) {
//               setRedirectedProvider({provider: 'google', redirect: true});
//             }else {
//               const nonGoogleProviders = providers.filter(prov => prov !== 'google');
//               setRedirectedProvider({provider: nonGoogleProviders[0], redirect: true})
//             }
//           });
//         }
//       });
      
//     }
//   }, [response]);
  
//   return promptAsync
// }
// linkWithRedirect(auth.currentUser , new FacebookAuthProvider)
// .then(() => console.log('Linked User'))
// .catch(err => console.log("Link Error: ", err.code));
// getRedirectResult(auth).then((result) => {
//   const credential = GoogleAuthProvider.credentialFromResult(result);
//   if (credential) {
//     const user = result.user;
//     console.log("successfully linked!", user)
//   }
// }).catch((error) => {
//   console.log("Get result Error: ", error.code)
// });