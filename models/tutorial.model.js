const sql = require("db.js");
// constructor
const Lesson = function (Lesson) {
  this.title = Lesson.title;
  this.description = Lesson.description;
  this.grade_id = Lesson.grade_id;
  this.date_uploaded = Lesson.date_uploaded;
  this.uploaded_by = Lesson.uploaded_by;
};

Lesson.create = (newLesson, result) => {
  sql.query("INSERT INTO tbl_lessons SET ?", newLesson, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created Lesson: ", { lesson_id: res.insertId, ...newLesson });
    result(null, { lesson_id: res.insertId, ...newLesson });
  });
};

Lesson.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_lessons WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found Lesson: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Lesson with the id
    result({ kind: "not_found" }, null);
  });
};

Lesson.getAll = (title, result) => {
  let query = "SELECT * FROM tbl_lessons";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tbl_lessons: ", res);
    result(null, res);
  });
};

Lesson.updateById = (id, Lesson, result) => {
  sql.query(
    "UPDATE tbl_lessons SET title = ?, description = ?, published = ? WHERE id = ?",
    [Lesson.title, Lesson.description, Lesson.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Lesson with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Lesson: ", { id: id, ...Lesson });
      result(null, { id: id, ...Lesson });
    }
  );
};
Lesson.remove = (id, result) => {
  sql.query("DELETE FROM tbl_lessons WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Lesson with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Lesson with id: ", id);
    result(null, res);
  });
};
Lesson.removeAll = (result) => {
  sql.query("DELETE FROM tbl_lessons", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} tbl_lessons`);
    result(null, res);
  });
};
module.exports = Lesson;
