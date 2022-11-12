require("dotenv").config();
const express = require('express');
const path = require("path");
const db = require("./db");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/qa/questions', db.getQuestions);
app.get('/qa/questions/:question_id/answers', db.getAnswers);
// app.post('/qa/questions', db.addQuestion)
// app.put()

app.listen(3000);
console.log(`Listening at http://localhost:3000`);