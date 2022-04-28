import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';
import useProviderSignIn from '../hooks/useProviderSignIn';
import * as AppleAuthentication from 'expo-apple-authentication';


const OauthButtons = ({navigation}) => {
  const [appleAvailable, setAppleAvailable] = React.useState(false);
  React.useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setAppleAvailable(true))
  }, [])

  const signInWith = useProviderSignIn();

  return (
    <View style={{padding: 10, justifyContent: 'space-between', height: 250 }}>
      <View style={{borderColor: 'gray', borderWidth: 0.5, width: 250, alignSelf: 'center'}}/>
      <Text style={{color: 'gray', fontSize: 16, marginVertical: 10, alignSelf: 'center'}}>or continue with</Text>
      <Button
        title="google"
        backgroundColor='red'
        textStyle={styles.OauthButtonText}
        containerStyle={styles.OauthButtonContainer}
        onPress={signInWith.google}
      />
      <Button
        title="facebook"
        backgroundColor='blue'
        textStyle={styles.OauthButtonText}
        containerStyle={styles.OauthButtonContainer}
        onPress={signInWith.facebook}
      />
      {/* // Github only offers 1 redirect per app
        // so web will be the only platform using github Oauth
       <Button
        title="github"
        backgroundColor='black'
        containerStyle={styles.OauthButtonContainer}
        textStyle={styles.OauthButtonText}
        onPress={() => (signInWith('github'))({useProxy:true})}
      /> */}
      {appleAvailable ? 
        <AppleAuthentication.AppleAuthenticationButton
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          cornerRadius={25}
          onPress={() => console.log('apple log in')}
          style={{ width: 250, height: 50, borderRadius: 10, alignSelf: 'center' }}
        />
        :
        null
      }
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