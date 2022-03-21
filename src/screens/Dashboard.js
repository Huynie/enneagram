import { View, Text } from 'react-native';
import Button from '../component/Button';
import Graphic from '../component/graphic';
import { auth } from '../firebase/config';
import { signOut } from '@firebase/auth';

const Dashboard = ({navigation}) => {
  const logOut = async() => {
    try{
        await signOut(auth);
        navigation.navigate('Login');
    } catch (err) {
        console.error(err);
    }
}
  return (
    <View>
      <Graphic/>
      <Text>Dashboard</Text>
      <Button
        title="sign out"
        onPress={() => logOut()}
      />
    </View>
  )
};

export default Dashboard;