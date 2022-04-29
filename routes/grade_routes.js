module.exports = (app) => {
  const grades = require("../controllers/Grade.js");
  var router = require("express").Router();

  router.post("/", grades.create);
  router.get("/", grades.findAll);
  router.get("/:id", grades.findOne);
  router.put("/:id", grades.update);
  router.delete("/:id", grades.delete);

  app.use("/api/grades", router);
};
