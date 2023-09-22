const express = require('express');
const app = express();
const cors = require('cors')
const userRoute = require("./userRoute")
const mongoose = require("mongoose")

app.use(cors());
app.use(express.json());
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(res => {
  console.log("DB is connected successfully.")
}) 
.catch(err => {
  console.log(err.message)
})


app.use("/api", userRoute)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
