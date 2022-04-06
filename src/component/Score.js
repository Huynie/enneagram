import React from 'react';
import { View, Text } from 'react-native';

const Score = ({score}) => {
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        {score.map((num, idx) => {
          return (
            <Text key={idx}>T{idx+1}</Text>
          )
        })}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        {score.map((num, idx) => {
          return (
            <Text key={idx}>{num}</Text>
          )
        })}
      </View>
    </View>
  )
}

export default Score