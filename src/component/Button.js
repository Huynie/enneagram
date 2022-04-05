import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({title, onPress, backgroundColor, color, disabled}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{
        ...styles.buttonContainer,
        backgroundColor: backgroundColor ?? '#89E5CF',
        opacity: disabled ? 0.5 : 1 
      }}
      disabled={disabled}
    >
      <Text style={{...styles.buttonText, color: color ?? 'white'}}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer:{
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText:{
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase'
  }
})
export default Button