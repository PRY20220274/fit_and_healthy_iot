const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const {router: fitRoutes} = require("./src/routes/fit");


app.use(bodyParser.json());
app.use(cors());
app.use('/api/', fitRoutes);

const PORT = 4040;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
