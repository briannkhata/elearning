const Assesment = require("../models/mAssesment.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Fill All fields!",
    });
  }
  const Assesment = new Assesment({
    assesment: req.body.assesment,
    date_added: req.body.date_added,
    due_date: req.body.due_date,
  });

  Assesment.create(Assesment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Assesment.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  Assesment.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Assesments.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Assesment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assesment with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Assesment with id " + req.params.id,
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
  Assesment.updateById(req.params.id, new Assesment(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assesment with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Assesment with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Assesment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assesment with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Assesment with id " + req.params.id,
        });
      }
    } else res.send({ message: `Assesment was deleted successfully!` });
  });
};
