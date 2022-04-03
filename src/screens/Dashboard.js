import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Button from '../component/Button';
import Graphic from '../component/graphic';
import Score from '../component/Score';
import { signOut } from '@firebase/auth';
import Avatar from '../component/Avatar';
import { db, auth } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore/lite"
import { useQuery } from 'react-query';

const Dashboard = ({navigation}) => {
  const {data, isLoading} = useQuery('userData', async () => {
    const userDatabase =  doc(db, "users", auth.currentUser.uid);
    const res = await getDoc(userDatabase);
    const {firstName, lastName, results} = res.data();
    if(results) {
      const latestScore = results[0].score;
      const highNums = latestScore.sort((a,b) => b-a).slice(0,3);
      const highs = []; 
      const lows = [];
      highNums.forEach((num) => {
        highs.push(latestScore.indexOf(num) + 1);
      });
      //GET 2 LOWEST TYPE
      const lowNums = latestScore.sort((a,b) => a-b).slice(0,2);
      lowNums.forEach((num) => {
        lows.push(latestScore.indexOf(num) + 1);
      });
      return {
        firstName,
        lastName,
        highs,
        lows,
        results
      }
    }
  });

  const logOut = async() => {
    try{
        await signOut(auth);
        navigation.navigate('Login');
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <ScrollView>
      {/* <SafeAreaView backgroundColor="#89E5CF"/> */}
      {/* <Avatar/> */}
      <Graphic 
        children={
          <Avatar
            firstName={!isLoading ? data.firstName : '...'}
            lastName={!isLoading ? data.lastName : '...'}
          />
        }
      />
      <View style={styles.typeBreakdown}>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text>Reformer</Text>
          <Text>Type 1</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text>Highs</Text>
            <View style={{flexDirection: 'row'}}>
              {!isLoading ?
                data.highs.map((num, idx) => {
                  return(
                    <Text key={idx}>{num}</Text>
                  )
                })
                :
                <Text>...</Text>
              }
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text>Lows</Text>
            <View style={{flexDirection: 'row'}}>
              {!isLoading ?
                data.lows.map((num, idx) => {
                  return(
                    <Text key={idx}>{num}</Text>
                  )
                })
                :
                <Text>...</Text>
              }
            </View>
          </View>
        </View>
      </View>
      <Button
        title="sign out"
        onPress={() => logOut()}
      />
      <Button
        title="React Query"
        onPress={() => navigation.navigate('React Query')}
      />
      <View style={styles.divider}/>
      <Text>Radar Chart</Text>
      <View style={styles.divider}/>
      <View>
        <Text>History</Text>
        {!isLoading ? 
          data.results.map((result, idx) => {
            return (
              <View key={idx}>
                <Text>{result["date/time"].toDate().toDateString()}</Text>
                <Text>{result["date/time"].toDate().toLocaleTimeString('en-US')}</Text>
                <Score score={result.score}/>
              </View>
            )
          }) : 
          <Text>...</Text>
        }
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  divider: {
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 5
    },
    padding: 10,
    backgroundColor: 'white',
    height: 100,
    borderBottomRightRadius: 60
   //  width: 100
  },
  typeBreakdown: {
    alignItems: 'center',
    // width: 500
  }
})

export default Dashboard;