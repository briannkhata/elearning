const Grade = require("../models/mGrade.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Fill All fields!",
    });
  }
  const Grade = new Grade({
    grade: req.body.grade,
    description: req.body.description,
  });

  Grade.create(Grade, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Grade.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const grade = req.query.grade;
  Grade.getAll(grade, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Grades.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Grade.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Grade with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Grade with id " + req.params.id,
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
  Grade.updateById(req.params.id, new Grade(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Grade with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Grade with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Grade.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Grade with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Grade with id " + req.params.id,
        });
      }
    } else res.send({ message: `Grade was deleted successfully!` });
  });
};
