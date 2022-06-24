const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const { send_excel_file }  = require('../bot/bot-action');

const corsOptions = {
  origin : 'https://klaytn-dean.vercel.app',
  credentials : true,
}
const router = express.Router();

router.use(bodyParser.json(),cors(corsOptions))

router.get('/', (req, res) => {
  send_excel_file(req, res);
});

module.exports = router;