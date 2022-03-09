import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { head } from "lodash";
import Graphic from './src/component/graphic';

function LoginScreen() {
  return (
    <View>
      <Graphic/>
      <View style={styles.screenContainer}>
        <TextInput placeholder="Email" style={styles.input}/>
        <TextInput placeholder="Password" style={styles.input}/>
        <Button title="Login" color="#89E5CF" style={styles.button} onPress={()=> console.log('logging in')}/>
        <Text>Forgot Password? Click here</Text>
        <Text>Register Here</Text>
      </View>
    </View>
  );
}

function TestScreen() {
  
  return (
    <View>
      <Graphic/>
      <View style={styles.screenContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questions}>questions 1</Text></View>
        <View style={styles.questionContainer}>
          <Text style={styles.questions}>questions </Text>
        </View>
        <Button title="next" style={styles.button} color="#89E5CF"/>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const navTheme = DefaultTheme;
navTheme.colors.background = 'white';
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: makeIconRender("login"),
            headerShown: false
          }}
        />
          <Tab.Screen
            name="Test"
            component={TestScreen}
            options={{ tabBarIcon: makeIconRender("clipboard-list-outline") ,
            headerShown: false
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}

const styles = StyleSheet.create({
  screenContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center" 
  },
  input: {
    backgroundColor: '#EBEBEB',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 20
  },
  button: {
    paddingHorizontal: 20,
    fontSize: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  questionContainer: {
    backgroundColor: "#89E5CF",
    borderRadius: 20,
    minHeight: 300,
    minWidth: 500,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  questions: {
    color: 'white',
    fontSize: 20,
  }
})