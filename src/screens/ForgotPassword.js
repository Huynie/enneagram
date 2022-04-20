import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Graphic from '../component/graphic';
import Button from '../component/Button';
import { Input } from 'react-native-elements';
import { sendPasswordResetEmail } from '@firebase/auth';
import { auth, db } from "../firebaseConfig/config";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);

  const resetPassword = () => {
    if(email !== '') {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log(email);
          setErrorMessage("If your account exists you will receive an email");
          setError(true);
        }).catch(err => {
          console.log(err.message, email);
          setError(true);
          setErrorMessage(err.message);
        })
      return
    };
    setError(true);
    setErrorMessage('Please enter your email to reset your password.');
  }

  return (
    <View>
      <Graphic/>
      <View style={styles.forgotPwContainer}>
        <Text style={{color: 'gray', marginBottom: 20}}>Please enter your email to reset your password.</Text>
        <TextInput 
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <View>
          {error ? 
          <Text style={{fontSize: 14, color: 'red', marginBottom: 20}}>{errorMessage}</Text>
          :
          <></>
          }
        </View>
        <Button
          title="Reset"
          onPress={() => resetPassword(email)}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  forgotPwContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  input: {
    backgroundColor: '#EBEBEB',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 20,
    width: 250
  }
})

export default ForgotPassword;