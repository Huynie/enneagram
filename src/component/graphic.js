import {View} from 'react-native';
const Graphic = () => {
  return (
    <View >
      <View style={{backgroundColor: '#89E5CF', height: 110, alignSelf: 'stretch', borderBottomRightRadius: 80}}></View>
      <View style={{alignSelf: 'stretch', backgroundColor: '#89E5CF'}}>
        <View style={{backgroundColor: '#FFF', height: 110, align: 'stretch', borderTopLeftRadius: 80}}></View>
      </View>
    </View>
  )
}

export default Graphic