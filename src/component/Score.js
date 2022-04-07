import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Score = ({score}) => {
  return (
    <View style={styles.containerShadow}>
      <View style={styles.cellContainer}>
        {score.map((num, idx) => {
          return (
            <View key={idx}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>T{idx+1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{num}</Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerShadow:{
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 5,
    maxWidth: 330
  },
  cellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#EEFBF8',
    // borderWidth: 2,

  },
  cell:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    // padding: 9,
    width: 37,
    height: 37,
    borderColor: 'white',
    borderWidth: 0.2,
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 2
    }
  },
  cellText:{
    fontSize: 14,
    color: '#059669',
    fontWeight: '700',
    shadowOpacity: 0,
    shadowRadius: 0
  }
});
export default Score