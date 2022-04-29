module.exports = (app) => {
  const lessons = require("../controllers/Lesson.js");
  var router = require("express").Router();

  //Lessons routes
  router.post("/", lessons.create);
  router.get("/", lessons.findAll);
  router.get("/:id", lessons.findOne);
  router.put("/:id", lessons.update);
  router.delete("/:id", lessons.delete);

  //Grade routes
  router.post("/", grades.create);
  router.get("/", grades.findAll);
  router.get("/:id", grades.findOne);
  router.put("/:id", grades.update);
  router.delete("/:id", grades.delete);

  app.use("/api/lessons", router);
  app.use("/api/grades", router);
};
