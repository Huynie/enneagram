import React, { useState, useEffect, useRef } from 'react';
import { 
  Button,
  Container, 
  Row, 
  Col,
  Card,
  Table,
  CardTitle,
  CardText
} from 'reactstrap';

export default function Main() {
  const questions = require('./questions.json');
  const types = require('./types.json');
  const [counter, setCounter] = useState(0);
  const [selected, setSelected] = useState(0);
  // const selectRef = useRef();
  const [results, setResults] = useState(null);
  const answerRef = useRef();
  const tally = useRef();
  const finalType = useRef();
  useEffect(() => {
    tally.current = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      G: 10,
      H: 0,
      I: 0,
    }
  }, []);
  const getType = () => {
    // const type2 = {
    //   "1": tally.current.D,
    //   "2": tally.current.F,
    //   "3": tally.current.C,
    //   "4": tally.current.E,
    //   "5": tally.current.H,
    //   "6": tally.current.B,
    //   "7": tally.current.I,
    //   "8": tally.current.G,
    //   "9": tally.current.A,
    // }
    const type = [
      tally.current.D,
      tally.current.F,
      tally.current.C,
      tally.current.E,
      tally.current.H,
      tally.current.B,
      tally.current.I,
      tally.current.G,
      tally.current.A,
    ]
    setResults(type);
  }
  const selectAnswer = (answer, btnIdx) => {
    setSelected(btnIdx)
    answerRef.current = answer;
    // console.log(answerRef.current)
  }
  const next = () => {
    setCounter(prev => {
      if(counter < questions.length - 1){
        return prev + 1
      }else{
        return prev
      }
    });
    setSelected(0);
    const parsed = answerRef.current.replace(/["]+/g, '');
    tally.current[parsed] = tally.current[parsed] + 1;
    // console.log(tally.current)
    // setTally(prev => {
    //   return{ ...prev, [parsed]: prev[answerRef.current] + 1}
    // })
  };
  // const prev = () => {
  //   setCounter(prev => {
  //     if(counter > 0){
  //       return prev - 1
  //     }else{
  //       return prev
  //     }
  //   })
  //   setSelected(prevSelected => prevSelected - 1)
  //   setTally(prev => ({...prev}))
  // }
  // useEffect(() => {
  //   selectRef.current = selected;
  //   results.current = tally;
  // });
  // console.log(tally)
  // console.log(selected, selectRef.current)
  return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card body className="text-center">
              <CardTitle tag="h6">
                question {counter + 1}/{questions.length}
              </CardTitle>
              <CardTitle tag="h5">
                Which one of these best describes you?
              </CardTitle>
              <CardText>
                {questions[counter].choice1}
              </CardText>
              <CardText>
                or
              </CardText>
              <CardText>
                {questions[counter].choice2}
              </CardText>
              <Row className="mb-4">
                <Col sm="6" md={{ size: 6, offset: 3 }}>
                    <Button color="primary" 
                      onClick={() => selectAnswer(questions[counter].answer1, 1)}
                      active={selected === 1}
                    >1st
                    </Button>
                    {' '}
                    <Button color="primary" 
                      onClick={() => selectAnswer(questions[counter].answer2, 2)}
                      active={selected === 2}
                    >2nd
                    </Button>
                </Col>
              </Row>
              <Row></Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  {/* <Button onClick={() => prev()}>Prev</Button> */}
                  {counter !== questions.length - 1 && 
                    <Button
                      disabled={selected === 0}
                      block
                      onClick={() => next()}
                      >Next
                    </Button>
                  }
                  {counter === questions.length - 1 && 
                  <Button 
                    disabled={selected === !1 || !2}
                    color="success"
                    block
                    onClick={() => getType()}
                    >get Type
                  </Button>
                  }
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {results ? ( 
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card body>
              <CardTitle tag="h2" className="text-center">
                Results
              </CardTitle>
              <CardTitle tag="h5">
                    <Table>
                      <thead>
                        <tr>
                          {results.map((_, key) => {
                            return(
                              <th key={key}>T{key+1}</th>
                            )
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        {results.map((type, key) => {
                          return(
                            <td key={key}>{type}</td>
                          )
                        })}
                        </tr>
                      </tbody>
                    </Table>
              </CardTitle>
              <CardTitle>
                Highest Type: 
                {finalType.current = results.indexOf(Math.max(...results)) + 1}
              </CardTitle>
              <CardTitle>
                Lowest Type: 
                {results.indexOf(Math.min(...results))+1}
              </CardTitle>
            </Card>
          </Col>
        </Row>
        ) : null
        }
        {finalType.current ? (
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card body >
                <CardTitle tag="h5" className="text-center">
                  {types[finalType.current - 1].type}
                </CardTitle>
                <CardText>
                  {types[finalType.current - 1].description}
                </CardText>
                <CardText>
                  <b>Fear:</b> {types[finalType.current - 1].fear}
                </CardText>
                <CardText>
                  <b>Desire:</b> {types[finalType.current - 1].desire}
                </CardText>
                <CardText>
                  <b>Motivation:</b> {types[finalType.current - 1].motivations}
                </CardText>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Container>
  );
}