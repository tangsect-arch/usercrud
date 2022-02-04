const express = require("express");
const app = express();
const customer = require("./app/v1/routes/customer");
const employee = require("./app/v1/routes/employee");
const userRouteV2 = require("./app/v2/routes/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/customer',customer);
app.use('/api/v1/employee',employee);
userRouteV2(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});