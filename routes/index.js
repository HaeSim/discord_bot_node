const express = require('express');
const cors = require('cors');
const { makeExcelFile } = require('../util/makeExcelFile');

const router = express.Router();

router.use(cors())

router.get('/', async (req, res) => {
  const excel = await makeExcelFile();
  const fileName = 'Holder_List.xlsx';

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
  excel.xlsx.write(res).then(()=>res.end()); // download
  
});

module.exports = router;