const express = require('express');
const { send_excel_file }  = require('../bot/bot-action');

const router = express.Router();

router.get('/', (req, res) => {
  send_excel_file(req, res);
});

module.exports = router;