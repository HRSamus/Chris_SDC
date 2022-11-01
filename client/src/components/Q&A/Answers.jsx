import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import { TOKEN, URL } from "/MyConfig.js";

const SoftButton = styled.button`
  border: none;
  background:none;
  text-decoration: underline;
  color: #404040;
`

const Collapse = styled.button`
  border: none;
  background:none;
  font-weight: bold;
  // padding-left: 20px;
  color: #404040;
`

const A = styled.div`
  padding: 0 0 20px 10px;
  margin: 0;
  // border-bottom: solid;
  // border-color: green;
`
const Answersdiv = styled.div`
  padding-top: 10px;
  max-height: 50vh;
  overflow: auto;
  // border-bottom: dotted;
  // border-color: green;
`
const P = styled.p`
   margin: 0;
   padding-bottom: 20px;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-color: yellow;
  padding-bottom: 20px;
`
const Padding = styled.div`
   margin: 0;
   padding-top: 10px;
`
const Footer = styled.div`
  background: #f8f8f8;
`

const Answers = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [id, setId] = useState(question.question_id);
  const [viewAll, setViewAll] = useState(true);
  const [answersLength, setAnswersLength] = useState(null);
  const [count, setCount] = useState(2);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${URL}/qa/questions/${question.question_id}/answers`,
      headers: { Authorization: TOKEN }
    })
      .then((res) => {
        let response = setSellersFirst(res.data.results);
        setViewAll(response.length > 2 ? false : true)
        setAnswers(response);
        setAnswersLength(response.length)
      })
      .catch((err) => (console.log('GET ANSWER', err)))
  }, [id])

  const setSellersFirst = (answersList) => {
    let sellers = [];
    let result = [];
    answersList.forEach((answer) => {
      (answer.answerer_name === "Seller") ? sellers.push(answer) : result.push(answer)
    })
    result = sellers.concat(result)
    return result;
  }

  const handleView = () => {
    if (viewAll) {
      setCount(2);
      setViewAll(false);
    } else {
      setCount(answersLength);
      setViewAll(true);
    }
  }

  return (
    <FlexRow>
      <Padding>
      <strong>A: &nbsp;</strong>
      </Padding>
      <Answersdiv>
        {answers.slice(0, count).map((answer) => (
          <A key={answer.answer_id}>
            <P>{answer.body}</P>
            <div>
              {answer.photos.map((photo, index) => (
                <img key={index} src={photo.url} height='100px'></img>
              ))}
            </div>
            <Footer><footer><AnswerInfo answer={answer} /></footer></Footer>
          </A>
        ))}

        {viewAll && answersLength > 2 ?
          <Collapse onClick={() => handleView()}>
            COLLAPSE ANSWERS
          </Collapse> : null}
        {(!viewAll) && answersLength > count ?
          <Collapse onClick={() => handleView()}>
            LOAD MORE ANSWERS
          </Collapse> : null}
      </Answersdiv>
    </FlexRow>
  )
}

  const AnswerInfo = ({ answer }) => {
  const [isReported, setIsReported] = useState(answer.reported)
  const [isHelpful, setIsHelpful] = useState(false)

  const convertDate = (inp) => {
    let formattedDate = new Date(inp)
    formattedDate = formattedDate.toDateString().split(' ');
    return `${formattedDate[1]} ${formattedDate[2]}, ${formattedDate[3]}`
  }


  const handleReported = (answer_id) => {
    if (!isReported) {
      axios({
        method: 'put',
        url: `${URL}/qa/answers/${answer_id}/report`,
        headers: { Authorization: TOKEN }
      })
        .then(() => setIsReported(true))
        .catch((err) => (console.log('report answer', err)))
    }
  }

  const handleHelpfulness = (answer_id) => {
    if (!isHelpful) {
      axios({
        method: 'put',
        url: `${URL}/qa/answers/${answer_id}/helpful`,
        headers: { Authorization: TOKEN }
      })
        .then(() => setIsHelpful(true))
        .catch((err) => (console.log('report answer', err)))
    }

  }

  return (
    <>
      <small> by {answer.answerer_name === "Seller" ?
          <strong>Seller</strong>
          :
          answer.answerer_name}, {convertDate(answer.date)} |
        Helpful?
        <SoftButton onClick={() => handleHelpfulness(answer.answer_id)}>
          Yes
        </SoftButton>
        ({isHelpful ? answer.helpfulness + 1 : answer.helpfulness}) |
        {isReported ?
          <> Reported </>
          :
          <SoftButton onClick={() => handleReported(answer.answer_id)}>
            Report
          </SoftButton>}
      </small>
    </>
  )
}


export default Answers;