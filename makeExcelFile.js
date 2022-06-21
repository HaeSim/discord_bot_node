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
  
  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  sheet.cell(1, 1)
    .string('text')
    .style(style);
  sheet.cell(1, 2)
    .number(100)
    .style(style);

  // Set value of cell B1 to 200 as a number type styled with paramaters of style
  sheet.cell(1, 3)
    .date(new Date())
    .style(style);

  // Set value of cell C1 to a formula styled with paramaters of style
  sheet.cell(1, 4)
    .formula('A1 + B1')
    .style(style);

  // Set value of cell A2 to 'string' styled with paramaters of style
  sheet.cell(1, 5)
    .string('id')
    .style(style);

  // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
  sheet.cell(1, 6)
    .bool(true)
    .style(style)
    .style({font: {size: 14}});
  
  return workbook;
}

module.exports = {
  makeExcelFile,
};