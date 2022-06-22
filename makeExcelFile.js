const excel = require('excel4node'); // npm install excel4node --save 를 통해 설치

async function makeExcelFile(request) {

  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var sheet = workbook.addWorksheet('Sheet 1');

  // Create a reusable style
  var style = workbook.createStyle({
    font: {
      color: '#FF0800',
      size: 12,
    }
    // ,numberFormat: '$#,##0.00; ($#,##0.00); -',
  });
  
  // HEADER
  sheet.cell(1, 1)
    .string('INDEX')
    .style(style);

  sheet.cell(1, 2)
    .string('ID')
    .style(style);

  sheet.cell(1, 3)
    .string('NAME')
    .style(style);

  sheet.cell(1, 4)
    .string('ADDRESS')
    .style(style);

  sheet.cell(1, 5)
    .string('NFT Count')    
    .style(style);

  sheet.cell(1, 6)
    .string('DateTime')
    .style(style);

  for(let i=2; i<10; i++) {
    sheet.cell(i, 1)
      .number(i-1)
      .style(style);
  
    sheet.cell(i, 2)
      .string('00000' + i)
      .style(style);
  
    sheet.cell(i, 3)
      .string('TEST'+ i)
      .style(style);
  
    sheet.cell(i, 4)
      .string('0x01230df'+(i*2))
      .style(style);
  
    sheet.cell(i, 5)
      .number(i)    
      .style(style);
  
    sheet.cell(i, 6)
      .date(new Date())
      .style(style);
  }
  
  return workbook;
}

module.exports = {
  makeExcelFile,
};