import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({progress}) => {

  return (
    <View
      style={{
        backgroundColor: 'lightgray',
        width: 300,
        height: 5,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: 'lightgrey',
        overflow: 'hidden',
        // marginBottom: 10
      }}
      >
      <View
        style={{
          width: `${progress * 0.695}%`,
          height: 5,
          backgroundColor: '#EC4899',
          overflow: 'hidden'
        }}
      ></View>
    </View>
  )
}

export default ProgressBar