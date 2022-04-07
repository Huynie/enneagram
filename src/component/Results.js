import * as React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Score from './Score';
import Types from '../types.json';
import useCalculateScore from '../hooks/useCalculateScore';

export const TypeTitle = ({core}) => {
  return(
    <View style={{marginTop: 20}}>
      <Text style={styles.typeTitle}>{Types[core - 1].type}</Text>
      <Text style={[styles.typeTitle,{color: '#F9A8D4'}]}>Type {core}</Text>
    </View>
  )
}

export const Description = ({core}) => {
  return (
    <ScrollView contentContainerStyle={styles.typeContainer}>
      <Text style={[styles.description, {marginTop: 10}]}>{Types[core - 1].description}</Text>
      <Text style={styles.description}>
        <Text style={{ color: 'red', fontWeight: '700'}}>Fear: </Text>
        {Types[core - 1].fear}
      </Text>
      <Text style={styles.description}>
        <Text style={{ color: 'darkorange', fontWeight: '700'}}>Motivations: </Text>
        {Types[core - 1].motivations}
      </Text>
      <Text style={styles.description}>
        <Text style={{ color: 'royalblue', fontWeight: '700'}}>Desire: </Text>
        {Types[core - 1].desire}
      </Text>
    </ScrollView>
  )
}

const Results = ({score}) => {
  const sorted = [
    score.D,
    score.F,
    score.C,
    score.E,
    score.H,
    score.B,
    score.I,
    score.G,
    score.A,
  ];

  const [core, highs, lows] = useCalculateScore(sorted)

  return (
    <View style={{paddingHorizontal: 20}}>
      <Score score={sorted}/>
      <TypeTitle core={core}/>
      <Description core={core}/>
    </View>
  )
}

const styles = StyleSheet.create({
  typeContainer:{
    justifyContent: 'space-evenly',
    minHeight: 450,
  },
  typeTitle: {
    fontSize: 20,
    color: '#EC4899',
    textAlign: 'center',
    fontWeight: '700',
  },
  description:{
    fontSize: 15,

  }
})

export default Results