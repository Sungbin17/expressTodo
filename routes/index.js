var express = require('express');
var router = express.Router();
const TodoTask = require("../models/Todo");



// 메인 페이지
router.get('/', function (req, res, next) {
  TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
  });
});

// 할일 만들기 
router.post('/', async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content
  });
  try {
    await todoTask.save();
    res.redirect("/");
  } catch (err) {
    console.log(err)
    res.redirect("/");
  }
});


// 할일 수정하기 페이지
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  TodoTask.find({}, (err, tasks) => {
    res.render("edit.ejs", { todoTasks: tasks, idTask: id });
  });
})

// 할일 수정하기
router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
});

// 할일 삭제하기
router.get("/remove/:id", (req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
});

module.exports = router;
