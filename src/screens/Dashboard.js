import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Button from '../component/Button';
import Graphic from '../component/graphic';
import Score from '../component/Score';
import { Description, TypeTitle } from '../component/Results';
import { signOut } from '@firebase/auth';
import Avatar from '../component/Avatar';
import { db, auth } from '../firebaseConfig/config';
import { useGetUser, useDeleteResult, useAddResult } from '../hooks/useFirebaseQuery';

const Dashboard = ({navigation}) => {
  const {isLoading, data, error} = useGetUser();
  const deleteResult = useDeleteResult();
  const addDummyResults = useAddResult();

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
      {
        error ? 
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Error: {error}</Text>
        </View>
        :
        <>
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
        <Button
          title="add dummy result"
          onPress={() => addDummyResults.mutate([1,1,1,1,1,1,1,1,1])}
        />
        <View style={styles.typeBreakdown}>
          {
            !isLoading && data.results ?
            <TypeTitle core={data.core}/>
            :
            <Text>...</Text>
          }
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: '700', color: 'gray', marginVertical: 5}}>Highs</Text>
              <View style={{flexDirection: 'row'}}>
                {!isLoading && data.results ?
                  data.highs.map((num, idx) => {
                    return(
                      <View key={idx} style={styles.highsLows}>
                        <Text  style={styles.highsLowsText}>T{num}</Text>
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
                {!isLoading && data.results ?
                  data.lows.map((num, idx) => {
                    return(
                      <View key={idx} style={styles.highsLows}>
                        <Text  style={styles.highsLowsText}>T{num}</Text>
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
            !isLoading && data.results ? 
            <Description core={data.core}/>
            :
            <Text>...</Text>
          }
        </View>

        <View style={styles.divider}/>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.sectionTitle}>Radar Chart</Text>
        </View>
        <View style={styles.divider}/>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.sectionTitle}>History</Text>
          {!isLoading && data.results ? 
            data.results.map((result, idx) => {
              return (
                <View key={idx} style={{marginVertical: 16}}>
                  <View style={{flexDirection: 'row',paddingVertical: 5}}>
                    <Text style={styles.dateTime}>{result["date/time"].toDate().toDateString()}</Text>
                    <Text style={styles.dateTime}>{result["date/time"].toDate().toLocaleTimeString('en-US')}</Text>
                    <Button
                      title="x"
                      containerStyle={{padding: 0}}
                      color="#EC4899"
                      backgroundColor="transparent"
                      textStyle={{fontSize: 24, alignSelf: 'center'}}
                      onPress={() => deleteResult.mutate(result)}
                    />
                  </View>
                  <Score score={result.score}/>
                </View>
              )
            }) : 
            <Text>...</Text>
          }
        </View>
        </>
      }
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
    flex: 1,
    alignSelf: 'center'
  }
})

export default Dashboard;