const express = require('express');
const cors = require('cors');

const { send_excel_file }  = require('../bot/bot-action');

const router = express.Router();

router.use(cors())

router.get('/', (req, res) => {
  send_excel_file(req, res);
});

module.exports = router;