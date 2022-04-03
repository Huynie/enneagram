import * as React from 'react';
import { Text, View, TextInput, StyleSheet,  } from "react-native";
import Graphic from '../component/graphic';
import Button from "../component/Button";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "@firebase/auth";

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState("test@test.com");
  const [password, setPassword] = React.useState("test123");
  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Dashboard', {user});
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
        <View style={{flexDirection: 'row', marginTop:  10}}>
          <Text>Forgot Password?</Text>
          <Text
            style={{color: 'blue'}}
            onPress={() => navigation.navigate('Forgot Password')}
            >Click here</Text>
        </View>
        <Text
          style={{color: 'blue'}}
          onPress={() => navigation.navigate('Register')}
        >Register Here</Text>
      </View>
      <Button
        title="React Query"
        onPress={() => navigation.navigate('React Query')}
      />
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