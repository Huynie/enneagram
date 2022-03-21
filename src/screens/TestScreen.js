import { Text, View, StyleSheet } from "react-native";
import Graphic from '../component/graphic';
import Button from '../component/Button';

export default function TestScreen() {

  return (
    <View>
      <Graphic />
      <View style={styles.screenContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questions}>questions 1</Text></View>
        <View style={styles.questionContainer}>
          <Text style={styles.questions}>questions </Text>
        </View>
        <Button 
          title="next"
          backgroundColor="#89E5CF"
          color="white"
          onPress={() => console.log("next")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer:{
    justifyContent: "center",
    alignItems: "center" 
  },
  questionContainer: {
    backgroundColor: "#89E5CF",
    borderRadius: 15,
    minHeight: 100,
    minWidth: 200,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  questions: {
    color: 'white',
    fontSize: 20,
  }
})
