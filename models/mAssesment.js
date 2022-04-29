const sql = require("./db.js");
const assesment = function (assesment) {
  this.assesment = assesment.title;
  this.description = assesment.description;
  this.due_date = assesment.due_date;
  this.date_added = assesment.date_added;
};

assesment.create = (newassesment, result) => {
  sql.query("INSERT INTO tbl_assesments SET ?", newassesment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created assesment: ", {
      assesment_id: res.insertId,
      ...newassesment,
    });
    result(null, { assesment_id: res.insertId, ...newassesment });
  });
};

assesment.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_assesments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found assesment: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

assesment.getAll = (title, result) => {
  let query = "SELECT * FROM tbl_assesments";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tbl_assesments: ", res);
    result(null, res);
  });
};

assesment.updateById = (id, assesment, result) => {
  sql.query(
    "UPDATE tbl_assesments SET title = ?, description = ?, grade_id = ? , date_added = ?, added_by = ? WHERE assesment_id = ?",
    [
      assesment.title,
      assesment.description,
      assesment.grade_id,
      assesment.date_uploaded,
      assesment.uploaded_by,
      id,
    ],
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
      console.log("updated assesment: ", { id: id, ...assesment });
      result(null, { id: id, ...assesment });
    }
  );
};

assesment.remove = (id, result) => {
  sql.query(
    "DELETE FROM tbl_assesments WHERE assesment_id = ?",
    id,
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
      console.log("deleted assesment with id: ", id);
      result(null, res);
    }
  );
};

module.exports = assesment;
