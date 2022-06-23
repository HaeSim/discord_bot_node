const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotEnv = require('dotenv');

const { runBot } = require('./bot/bot');
const indexRouter = require('./routes')
const discordRouter = require('./routes/discord')

dotEnv.config();

const app = express();
const corsOptions = {
    origin : 'https://klaytn-dean.vercel.app',
    credentials : true,
}

app.use(bodyParser.json(),cors(corsOptions));
app.use('/', indexRouter);
app.use('/discord', discordRouter);



app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);

runBot();

  
