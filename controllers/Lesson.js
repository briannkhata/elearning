const Lesson = require("../models/mLesson.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Fill All fields!",
    });
  }
  const lesson = new Lesson({
    title: req.body.title,
    description: req.body.description,
    date_uploaded: req.body.date_uploaded,
    uploaded_by: req.body.uploaded_by,
    grade_id: req.body.grade_id || false,
  });

  Lesson.create(lesson, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lesson.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  Lesson.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Lesson.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found lesson with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Lesson with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Fill all fields!",
    });
  }
  console.log(req.body);
  Lesson.updateById(req.params.id, new Lesson(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Lesson with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Lesson with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Lesson.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Lesson with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Lesson with id " + req.params.id,
        });
      }
    } else res.send({ message: `Lesson was deleted successfully!` });
  });
};
