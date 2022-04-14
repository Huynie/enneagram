import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { head } from "lodash";
import Login from "./src/screens/LoginScreen";
import TestScreen from "./src/screens/TestScreen";
import Dashboard from "./src/screens/Dashboard";
import Register from "./src/screens/Register";
import ForgotPassword from "./src/screens/ForgotPassword";
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import { db, auth } from './src/firebase/config';
import { doc, getDoc } from "firebase/firestore/lite";
import { onAuthStateChanged } from 'firebase/auth';
import * as React from 'react';
import {View, Text} from 'react-native';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

// firebase is connected from onAuthStateChange
// default initializing component is needed
// otherwise _config.auth.currentUser is null error

const Spinner = () => (
  <View>
    <Text>Loading...</Text>
  </View>
)

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const subscriber = onAuthStateChanged(auth, user => {
      setUser(user);
      console.log(user)
    });
    auth.currentUser ? console.log(auth.currentUser) : console.log('no user: ', user)
    return subscriber;
  }, []);

  const navTheme = DefaultTheme;
  navTheme.colors.background = 'white';
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={navTheme}>
        
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: makeIconRender("login"),
              headerShown: false,
              tabBarButton: user ?  () => null :undefined
            }}
          />
          <Tab.Screen
            name="Dashboard"
            component={user ? Dashboard : Spinner}
            options={{
              tabBarIcon: makeIconRender("view-dashboard"),
              headerShown: false,
              tabBarButton: user ? undefined : () => null ,
              // tabBarVisible: false
            }}
          />
          <Tab.Screen
            name="Test"
            component={TestScreen}
            options={{ tabBarIcon: makeIconRender("clipboard-list-outline") ,
            headerShown: false
            }}
          />
          <Tab.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
              tabBarButton: () => null
            }}
          />
          <Tab.Screen
            name="Forgot Password"
            component={ForgotPassword}
            options={{
              headerShown: false,
              tabBarButton: () => null
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

function makeIconRender(name) {
  return ({ color, size }) => {
    return <MaterialCommunityIcons name={name} color={color === 'rgb(0, 122, 255)' ? '#EC4899' : '#8E8E8F' } size={size} />
  };
}

