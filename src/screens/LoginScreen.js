import * as React from 'react';
import { Text, View, TextInput, StyleSheet,  } from "react-native";
import Graphic from '../component/graphic';
import Button from "../component/Button";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import OauthButtons from '../component/OauthButtons';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState("test2@test.com");
  const [password, setPassword] = React.useState("test123");
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View>
      <Graphic />
      <View style={styles.screenContainer}>
        <TextInput 
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput 
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={() => signIn()}
        />
        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 5}}>
          <Text style={{fontSize: 16, color: 'gray'}}>
            Forgot Password? </Text>
          <Text
            style={{fontSize: 16, color: 'gray', fontWeight: '700'}}
            onPress={() => navigation.navigate('Forgot Password')}
          >
            Click here
          </Text>
        </View>
        <View
          style={{flexDirection: 'row',}}
        >
          <Text style={{color: 'gray', fontSize: 16}}>Register </Text>
          <Text
             style={{color: 'gray', fontSize: 16, fontWeight: '700'}}
             onPress={() => navigation.navigate('Register')}
          >
            here
          </Text>
        </View>
      </View>
      <OauthButtons/>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer:{
    justifyContent: "center",
    alignItems: "center" 
  },
  input: {
    backgroundColor: '#EBEBEB',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 20,
    width: 250
  },
  button: {
    paddingHorizontal: 20,
    fontSize: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: "#89E5CF"
  }
})

export default Login;