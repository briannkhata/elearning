module.exports = (app) => {
  const lessons = require("../controllers/Lesson.js");
  var router = require("express").Router();

  router.post("/", lessons.create);
  router.get("/", lessons.findAll);
  router.get("/:id", lessons.findOne);
  router.put("/:id", lessons.update);
  router.delete("/:id", lessons.delete);

  app.use("/api/lessons", router);
};
