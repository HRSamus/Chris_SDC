const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  PORT: process.env.PORT
});

client.connect()

.then(() => {
  console.log('connected')
})
.catch(err => {
  console.log(err)
})

const getQuestions = (req, res) => {
  client.query(`SELECT question_id, question_body, date_written, asker_name, questions_helpfulness AS questions_helpfulness, ques.answers FROM questions."Questions",
  LATERAL (
    SELECT ARRAY (
      SELECT json_build_object(answer_id, json_build_object('id', answer_id, 'body', answer_body, 'date', "date_written_A", 'answerer_name', "answerer_name_A", 'helpfulness', "answer_helpfulness_A", 'photos', p.photos))
      FROM questions."Answers",
      LATERAL (
        SELECT ARRAY (
          SELECT json_build_object('id', photo_id, 'URL', "photo_URL") FROM questions."AnswerPhotos"
        WHERE questions."AnswerPhotos".answer_id = questions."Answers".answer_id)
        AS photos
      ) p
      WHERE question_id = questions."Questions".question_id
    ) AS answers
  ) ques WHERE product_id = ${req.query.product_id}`)
  .then ((data) => {
    let objData = data.rows.forEach((qna, id) => {
      let emptyObj = {};
      data.rows[id].answers.forEach((answer, idx) => {
        Object.assign(emptyObj, data.rows[id].answers[idx])
      })
      data.rows[id].answers = emptyObj
    })
    res.send({'product_id': req.query.product_id,
              'results': data.rows})
    })
  .catch(err => {
    console.log(err);
    res.send(err)
  })
}

const getAnswers = (req, res) => {
  let question_id = req.params.question_id
  let page = req.params.page || 1
  let count = req.params.count || 5
  // let time = TO_CHAR(TO_TIMESTAMP(questions."Answers"."date_written_A" / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
  client.query(
    `SELECT questions."Answers".answer_id, answer_body AS body, questions."Answers"."date_written_A" AS date, "answerer_name_A" AS answerer_name, "answer_helpfulness_A" AS helpfulness, p.photos
    FROM questions."Answers",
    LATERAL (
      SELECT ARRAY (
        SELECT json_build_object('id', photo_id, 'URL', "photo_URL") FROM questions."AnswerPhotos"
        WHERE questions."AnswerPhotos".answer_id = questions."Answers".answer_id
      )
      AS photos
    ) p
    WHERE ${question_id} = questions."Answers".question_id`
  )
  .then((data) => {

    res.send({'question': question_id, 'page': page, 'count': count,  'results': data.rows})
  })
  .catch((err) => {
    res.send(err)
  })
}

const addQuestion = (req, res) => {
  console.log(req.query)
  let body = req.query.body;
  let name = req.query.name;
  let email = req.query.email;
  let product_id = req.query.product_id;
  let date = Date.now()
  client.query(
    `INSERT INTO questions."Questions"(product_id, question_body, date_written, asker_name, asker_email)
    VALUES (${product_id}, '${body}', '${date}', '${name}', '${email}')`
  )
  .then(data => {
    console.log(data.rows)
    res.end()
  })
  .catch(err => {
    console.log(err)
    res.send(err)
  })
}

module.exports = {client, getQuestions, getAnswers, addQuestion}



