const express = require("express");
const router = express.Router();
const User = require("../controllers/User");

router.get("/",User.login);
router.get("/dashboard", User.dahsboard);
router.get("/teacher", User.teachers);
router.get("/student", User.students);
router.get("/admin", User.admins);

router.post("/teacher", User.find);
router.get("/:id", User.delete);
router.get("/adduser", User.form);
router.post("/adduser", User.create);
router.post("/signin", User.signin);
router.get("/edituser/:id", User.edit);
router.post("/edituser/:id", User.update);
router.get("/logout", User.logout);

module.exports = router;
