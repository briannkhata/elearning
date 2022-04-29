const sql = require("./db.js");

const grade = function (grade) {
  this.title = grade.title;
  this.description = grade.description;
};

grade.create = (newgrade, result) => {
  sql.query("INSERT INTO tbl_grades SET ?", newgrade, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created grade: ", { grade_id: res.insertId, ...newgrade });
    result(null, { grade_id: res.insertId, ...newgrade });
  });
};

grade.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_grades WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found grade: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

grade.getAll = (grade, result) => {
  let query = "SELECT * FROM tbl_grades";
  if (grade) {
    query += ` WHERE grade LIKE '%${grade}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tbl_grades: ", res);
    result(null, res);
  });
};

grade.updateById = (id, grade, result) => {
  sql.query(
    "UPDATE tbl_grades SET title = ?, description = ? WHERE grade_id = ?",
    [grade.title, grade.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated grade: ", { id: id, ...grade });
      result(null, { id: id, ...grade });
    }
  );
};

grade.remove = (id, result) => {
  sql.query("DELETE FROM tbl_grades WHERE grade_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted grade with id: ", id);
    result(null, res);
  });
};

module.exports = grade;
