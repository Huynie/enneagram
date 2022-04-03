import { View, Text, StyleSheet } from 'react-native';

const Avatar = ({firstName, lastName}) => {
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>
          {firstName.charAt(0) + lastName.charAt(0)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer:{
    alignItems: 'center', backgroundColor: "transparent", position: 'absolute',
    top: 50,
    left: 50,
    right: 50,
    zIndex: 10
  },
  avatar:{
    borderRadius: 99,
    height: 100,
    width: 100,
    backgroundColor: 'green', borderWidth: 3,
    borderColor: "#EC4899"
  },
  initials:{
    color: 'white',
    fontSize: 40,
    fontWeight: '700',
    position: 'absolute',
    top: 25,
    left: 20
  }
})

export default Avatar