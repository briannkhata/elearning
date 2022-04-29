module.exports = (app) => {
  const assesments = require("../controllers/Assesment.js");
  var router = require("express").Router();

  router.post("/", assesments.create);
  router.get("/", assesments.findAll);
  router.get("/:id", assesments.findOne);
  router.put("/:id", assesments.update);
  router.delete("/:id", assesments.delete);

  app.use("/api/assesments", router);
};
