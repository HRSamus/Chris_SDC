import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components'
import Answers from ".//Answers.jsx";
import { TOKEN, URL } from "/MyConfig.js";
import AddQuestion from ".//AddQuestion.jsx";
import AddAnswer from ".//AddAnswer.jsx";
import Modal from 'react-modal';

const SoftButton = styled.button`
// font-family: 'Proxima Nova';
  border: none;
  background:none;
  text-decoration: underline;
  color: #404040;
`
const Button = styled.button`
// font-family: 'Proxima Nova';
  padding 10px 5px 10px 5px;
  border-color: #999999;
  background: none;
  color: #404040;
  font-weight: bold;
`
const Inline = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 5px;
  border-top: solid;
  border-top-width: thin;
  border-color: #ededed;
  height: 20px;
`
const QA = styled.div`
  // border: dotted;
  // border-color: purple;
  max-height: 100vh;
  overflow-y: scroll;
`
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'light grey'
  }
};


const QAList = ({ search, product}) => {
  const productId = product.id;
  const [questions, setQuestions] = useState([]);
  // const [id, setId] = useState(product.id);
  const [count, setCount] = useState(4);
  const [isHelpful, setIsHelpful] = useState(false);
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${URL}/qa/questions/?product_id=${product.id}&count=${10000}`,
      headers: { Authorization: TOKEN }
    })
      .then((res) => {
        console.log('productid', product.id)
        let answeredQuestions = res.data.results.filter((question) => {
          if(search.length > 3) {
            return question.question_body.includes(search);
          } else {
          return Object.keys(question.answers).length > 0
          }
        })
        setQuestions(answeredQuestions);
      })
      .catch((err) => (console.log('GET QUESTION', err)))
  }, [search, productId])

  const questionModal = () => {
    const setTrue = () => {
      setQuestionModalIsOpen(true)
    }
    const setFalse = () => {
      setQuestionModalIsOpen(false)
    }
    return (
      <>
        <Button onClick={setTrue}>ADD A QUESTION +</Button>
        <Modal isOpen={questionModalIsOpen} style={customStyles} onRequestClose={() => setQuestionModalIsOpen(false)}>
          <AddQuestion product={product}/>
        </Modal>
      </>
    )
  }

  return (
    <div>
      <QA>
        {questions.slice(0, count).map((question) => (
          <div key={question.question_id}>
            <Inline>
              <strong><label>Q:
                &nbsp; {question.question_body}</label></strong>
              <QuestionInfo question={question} product={product} />
            </Inline>
            <Answers key={question.question_id} question={question} />
          </div>
        ))}

        {(questions.length > 2 && count < questions.length) ?
          <Button onClick={(e) => setCount(count + 2)}>
            MORE ANSWERED QUESTIONS
          </Button> : null}</QA>
      {questionModal()}
    </div>
  )
}

const QuestionInfo = ({ question, product}) => {
  const [isReported, setIsReported] = useState(false)
  const [isHelpful, setIsHelpful] = useState(false)
  const [answerModalIsOpen, setAnswerModalIsOpen] = useState(false);

  const answerModal = (question) => {
    const setTrue = () => {
      setAnswerModalIsOpen(true)
    }
    const setFalse = () => {
      setAnswerModalIsOpen(false)
    }
    return (
      <>
        <SoftButton onClick={setTrue}>Add Answer</SoftButton>

        <Modal isOpen={answerModalIsOpen} style={customStyles} onRequestClose={() => setAnswerModalIsOpen(false)}>
          <AddAnswer question={question} product={product} />
        </Modal>
      </>
    )
  }


  const handleReported = (question_id) => {
    if (!isReported) {
      axios({
        method: 'put',
        url: `${URL}/qa/questions/${question_id}/report`,
        headers: { Authorization: TOKEN }
      })
        .catch((err) => (console.log('report question', err)))
    }
    setIsReported(true);
  }

  const handleHelpfulness = (question_id) => {
    if (!isHelpful) {
      axios({
        method: 'put',
        url: `${URL}/qa/questions/${question_id}/helpful`,
        headers: { Authorization: TOKEN }
      })
        .catch((err) => (console.log('report question', err)))
    }
    setIsHelpful(true);
  }

  return (
    <div>
      <small>Helpful?</small>
      <SoftButton onClick={() => {handleHelpfulness(question.question_id) }}>
        Yes
      </SoftButton>
      ({isHelpful ? question.question_helpfulness + 1 : question.question_helpfulness}) | {isReported ? <small> Reported </small> : <SoftButton onClick={() => handleReported(question.question_id)}><>Report</></SoftButton>} |
      {answerModal(question)}
    </div>
  )
}


export default QAList;

