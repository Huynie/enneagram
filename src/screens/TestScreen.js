import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as React from 'react';
import Graphic from '../component/graphic';
import Button from '../component/Button';
import questions from '../questions.json';

export default function TestScreen() {
  const [counter, setCounter]= React.useState(0);
  const [question1, setQuestion1]= React.useState(questions[counter].choice1);
  const [question2, setQuestion2]= React.useState(questions[counter].choice2);
  const [choice, setChoice]= React.useState(null);
  const [tally, setTally] = React.useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
  });
  const choice1 = () => {
    //button focus goes here
    const answer1 = questions[counter].answer1;
    setChoice(answer1);
    // clear focus from choice button 2
    // add focus to choice button 1
    // enable "next" button
  };
  const next = () => {
    if(choice !== '') {
      tally[choice] ++;
      // add tally to local storage
      counter ++
      // save counter as progress in local storage
      // setProgressBarFill(`${(parseInt(counter) + 1) * 0.695}%`);
      setQuestion1(questions[counter].choice1)
      setQuestion2(questions[counter].choice2)
      // clear all focus from buttons
      // showNext = counter === 143 ? false : true
      // showGetType = counter === 143 ? true : false
    }else{
      confirm('Please choose an answer.')
      return
    }

    choice = '';
    disabledBtn = true
  }

  return (
    <View>
      <Graphic />
      <View style={styles.screenContainer}>
        <TouchableOpacity
          style={styles.questionContainer}
          onPress={choice1}
        >
          <Text style={styles.questions}>{question1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.questionContainer}>
          <Text style={styles.questions}>{question2}</Text>
        </TouchableOpacity>
        <Button 
          title="next"
          backgroundColor="#89E5CF"
          color="white"
          onPress={next}
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
