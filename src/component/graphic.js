import {StyleSheet, View} from 'react-native';
const Graphic = ({children}) => {
  return (
    <View >
      {children}
      <View style={styles.topCorner}></View>
      <View style={{alignSelf: 'stretch', backgroundColor: '#89E5CF'}}>
        <View style={styles.bottomCorner}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topCorner:{
    backgroundColor: '#89E5CF', height: 110,
    alignSelf: 'stretch', borderBottomRightRadius: 80
  },
  bottomCorner:{
    backgroundColor: '#FFF',
    height: 110, borderTopLeftRadius: 80
  }
})
export default Graphic