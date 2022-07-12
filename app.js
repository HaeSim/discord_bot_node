const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotEnv = require('dotenv');

const indexRouter = require('./routes')
const discordRouter = require('./routes/discord')

dotEnv.config();

const app = express();

app.use(bodyParser.json(),cors());
app.use('/', indexRouter);
app.use('/discord', discordRouter);

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to DB'))
.catch(err => console.error(err));

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);