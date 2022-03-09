import {View} from 'react-native';
const Graphic = () => {
  return (
    <View >
      <View style={{backgroundColor: '#89E5CF', height: 100, alignSelf: 'stretch', borderBottomRightRadius: 99}}></View>
      <View style={{alignSelf: 'stretch', backgroundColor: '#89E5CF'}}>
        <View style={{backgroundColor: '#FFF', height: 100, align: 'stretch', borderTopLeftRadius: 99}}></View>
      </View>
    </View>
  )
}

export default Graphic