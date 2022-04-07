import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Button from '../component/Button';
import Graphic from '../component/graphic';
import Score from '../component/Score';
import { Description, TypeTitle } from '../component/Results';
import { signOut } from '@firebase/auth';
import Avatar from '../component/Avatar';
import { db, auth } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore/lite"
import { useQuery } from 'react-query';
import Types from '../types.json';
import useCalculateScore from '../hooks/useCalculateScore';

const Dashboard = ({navigation}) => {
  const {data, isLoading} = useQuery('userData', async () => {
    const userDatabase =  doc(db, "users", auth.currentUser.uid);
    const res = await getDoc(userDatabase);
    const {firstName, lastName, results} = res.data();
    if(results) {
      const latestScore = results[0].score;
      const [core, highs, lows] = useCalculateScore(latestScore);
      return {
        firstName,
        lastName,
        highs,
        lows,
        core,
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
      <Button
        title="sign out"
        onPress={() => logOut()}
      />
      <View style={styles.typeBreakdown}>
        {/* <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text>{!isLoading ? Types[data.core - 1].type : '...'}</Text>
          <Text>Type 1</Text>
        </View> */}
        {
          !isLoading ?
          <TypeTitle core={data.core}/>
          :
          <Text>...</Text>
        }
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: 'gray', marginVertical: 5}}>Highs</Text>
            <View style={{flexDirection: 'row'}}>
              {!isLoading ?
                data.highs.map((num, idx) => {
                  return(
                    <View style={styles.highsLows}>
                    <Text key={idx} style={styles.highsLowsText}>T{num}</Text>
                  </View>
                  )
                })
                :
                <Text>...</Text>
              }
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: 'gray', marginVertical: 10}}>Lows</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {!isLoading ?
                data.lows.map((num, idx) => {
                  return(
                    <View style={styles.highsLows}>
                      <Text key={idx} style={styles.highsLowsText}>T{num}</Text>
                    </View>
                  )
                })
                :
                <Text>...</Text>
              }
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        {
          !isLoading ? 
          <Description core={data.core}/>
          :
          <Text>...</Text>
        }
      </View>

      <View style={styles.divider}/>
      <Text>Radar Chart</Text>
      <View style={styles.divider}/>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.sectionTitle}>History</Text>
        {!isLoading ? 
          data.results.map((result, idx) => {
            return (
              <View key={idx} style={{marginVertical: 10}}>
                <View style={{flexDirection: 'row',paddingVertical: 5}}>
                  <Text style={styles.dateTime}>{result["date/time"].toDate().toDateString()}</Text>
                  <Text style={styles.dateTime}>{result["date/time"].toDate().toLocaleTimeString('en-US')}</Text>
                  <Text style={{flex: 0.1}}>x</Text>
                </View>
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
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
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
    justifyContent: 'center'
    // width: 500
  },
  highsLows:{
    overflow: 'hidden',
    borderRadius: 99,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: '#FCE7F3'
  },
  highsLowsText:{
    color: '#EC4899',
    fontSize: 16,
    fontWeight: '400'
  },
  sectionTitle:{
    fontSize: 30,
    fontWeight: '700'
  },
  dateTime:{
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    flex: 1
  }
})

export default Dashboard;