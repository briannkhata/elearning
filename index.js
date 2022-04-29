const express = require("express");
const cors = require("cors");
const app = express();
require("./routes/assesment_routes.js")(app);
require("./routes/grade_routes.js")(app);
require("./routes/lesson_routes.js")(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
