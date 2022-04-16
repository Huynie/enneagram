import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Graphic from '../component/graphic';
import Button from '../component/Button';
import { Input } from 'react-native-elements';

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');

  const resetPassword = () => {
    if(email !== '') {
      console.log('PW Reset!');
      return
    };
    console.log('please enter your email!');
  }

  return (
    <View>
      <Graphic/>
      <View style={styles.forgotPwContainer}>
        <Text style={{fontSize: 16, color: 'gray', marginBottom: 20}}>Please enter your email to reset your password.</Text>
        <TextInput 
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
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