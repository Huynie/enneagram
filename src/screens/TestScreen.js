import { Text, View, StyleSheet, Pressable } from "react-native";
import * as React from 'react';
import Graphic from '../component/graphic';
import Button from '../component/Button';
import questions from '../questions.json';
import { set } from "react-native-reanimated";

export default function TestScreen() {
  const [counter, setCounter]= React.useState(0);
  const [question1, setQuestion1]= React.useState(questions[counter].choice1);
  const [question2, setQuestion2]= React.useState(questions[counter].choice2);
  const [choice, setChoice]= React.useState(null);
  const [tally, setTally] = React.useState({
    D:0,
    F:0,
    C:0,
    E:0,
    H:0,
    B:0,
    I:0,
    G:0,
    A:0,
  });
  const [focused, setFocused] = React.useState(null);
  const questionSelect = (choiceNum) => {
    const answer = choiceNum === 1 ? questions[counter].answer1 : questions[counter].answer2;
    setFocused(choiceNum === 1 ? 'button1' : 'button2');
    setChoice(answer);
    // enable "next" button
  };
  const next = () => {
    if(choice) {
      setTally({...tally, [choice]: + 1});
      // add tally to local storage
      setCounter(counter + 1);
      // save counter as progress in local storage
      // setProgressBarFill(`${(parseInt(counter) + 1) * 0.695}%`);
      setQuestion1(questions[counter].choice1)
      setQuestion2(questions[counter].choice2)
      setFocused(null);
      // showNext = counter === 143 ? false : true
      // showGetType = counter === 143 ? true : false
    }else{
      console.log('Please choose an answer.')
      return
    }
  }

  return (
    <View>
      <Graphic />
      <View style={styles.screenContainer}>
        <Pressable
          style={{ ...styles.questionContainer, ...focused === 'button1' ? styles.focused : null}}
          onPress={() => questionSelect(1)}
        >
          <Text style={styles.questions}>{question1}</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.questionContainer, ...focused === 'button2' ? styles.focused : null}}
          onPress={() => questionSelect(2)}
        >
          <Text style={styles.questions}>{question2}</Text>
        </Pressable>
        <Button 
          title="next"
          backgroundColor="#89E5CF"
          color="white"
          onPress={next}
          // disabled={true}
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
    minHeight: 150,
    minWidth: 300,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 300,
    // height: 150,
    // padding: 5
  },
  questions: {
    color: 'white',
    fontSize: 20,
    // marginHorizontal: 'auto',
    maxWidth: 250,
    // borderWidth: 2,
  },
  focused: {
    borderColor: '#EC4899',
    borderWidth: 3,
    borderStyle: 'solid',
    backgroundColor: '#67D2D2'
  }
})
