import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Graphic from '../component/graphic';
import Button from "../component/Button";
import { Input } from 'react-native-elements';
import OauthButtons from '../component/OauthButtons';
import { auth, db } from "../firebaseConfig/config";
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { setDoc, doc, arrayUnion } from '@firebase/firestore/lite';

const Register = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const registerNewUser = async ({navigation}) => {
    console.log('registered!');
    if(
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" 
    ) 
    {
      try{
        // Create new account in Firebase Authentication database
        const createUser = await createUserWithEmailAndPassword(auth, this.email, this.password);

        const userDatabase = doc(db, `users/${createUser.user.uid}`);
        const resultExist = localStorage.score ? arrayUnion({
          "date/time": new Date(),
          score: JSON.parse(localStorage.score)
        }) : [];
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          results: resultExist,
        };

        // create new doc in Firebase Firestore database
        await setDoc( userDatabase, userData );
        // localStorage.removeItem("score");
        console.log('Saved to DB & score deleted');
        navigation.navigate('Dashboard');          
      } catch (err) {
        // this.error = true;
        // this.errorMsg = err.message.slice(10);
        console.log(err.message);
      }
      return;
    }
    console.log('form empty')
    // this.error = true;
    // this.errorMsg = "please fill out all the fields";
  };

  return (
    <View>
      <Graphic />
      <View style={styles.screenContainer}>
        <TextInput 
          placeholder="First Name"
          style={styles.input}
          value={firstName}
          onChangeText={(value) => setFirstName(value)}
        />
        <TextInput 
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={(value) => setLastName(value)}
        />
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
          title="register"
          onPress={() => registerNewUser()}
        />
      </View>
      <OauthButtons/>
    </View>
  )
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

export default Register;