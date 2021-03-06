const Excel = require('exceljs'); 

async function makeExcelFile(userList) {

  // Create a new instance of a Workbook class
  const workbook = new Excel.Workbook();
  workbook.creator = 'DEAN';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Add Worksheets to the workbook
  const sheetHolderList = workbook.addWorksheet('Holder List');
  const HEADER_STYLE = {
    // Font 설정
    font: {name: 'Arial Black', size: 13},
    // Fills 설정
    fill: {
      type: 'pattern',
      fgColor: {argb: 'FFFFFF00'},
      bgColor: {argb: 'FF0000FF'}
    },
    alignment : {
      vertical: 'middle',
      horizontal: 'center'
    }
  }
  const ROW_STYLE = {
    // Font 설정
    font: {size: 10},
    // Fills 설정
    fill: {
      type: 'pattern',
      fgColor: {argb: 'FFFFFF00'},
      bgColor: {argb: 'FF0000FF'}
    },
    alignment : {
      vertical: 'middle',
      horizontal: 'center'
    }
  }
  const ROW_DATE_STYLE = {
    // Font 설정
    font: {size: 10},
    // Fills 설정
    fill: {
      type: 'pattern',
      fgColor: {argb: 'FFFFFF00'},
      bgColor: {argb: 'FF0000FF'}
    },
    numFmt: 'yyyy/mm/dd',
    alignment : {
      vertical: 'middle',
      horizontal: 'center'
    }
  }
  
  // HEADER
  sheetHolderList.columns = [
    {header: 'INDEX',     key: 'index',     width: 10, style: HEADER_STYLE},
    {header: 'ID',        key: 'id',        width: 20, style: HEADER_STYLE, hidden:false},
    {header: 'NAME',      key: 'name',      width: 30, style: HEADER_STYLE},
    {header: 'CHAIN',     key: 'chain',     width: 30, style: HEADER_STYLE},
    {header: 'ADDRESS',   key: 'address',   width: 45, style: HEADER_STYLE},
    {header: 'NFT Count', key: 'nftCount',  width: 15, style: HEADER_STYLE},
    {header: 'DateTime',  key: 'datetime',  width: 20, style: HEADER_STYLE},
  ];

  // Row
  // SampleData
  const sampleData = [
    { index: 1, id: '0000000001', name: 'THIS',   chain : 'klaytn', address: '0x01172076A62A8ee348F5aaC995dDbC617294c410',  nftCount: 1, datetime: new Date() },
    { index: 2, id: '0000000002', name: 'IS',     chain : 'klaytn', address: '0xBe037070D68b73b1dD8959B392E96b536D2523d5',  nftCount: 4, datetime: new Date() },
    { index: 3, id: '0000000003', name: 'SAMPLE', chain : 'klaytn', address: '0xBe037070D68b73348F5a2E96b536D2523d5',       nftCount: 2, datetime: new Date() },
    { index: 4, id: '0000000006', name: 'DATA',   chain : 'klaytn', address: '0x01172076A62A8ee348F5aaC995dDbC617294c410',  nftCount: 7, datetime: new Date() },
    { index: 5, id: '0000000007', name: 'HAHA',   chain : 'klaytn', address: '0x0117212312rA8ee348F5aaC995dDbC617294c410',  nftCount: 1, datetime: new Date() },
    { index: 6, id: '0000000012', name: '^^',     chain : 'klaytn', address: '0x01172076A62Aawef2195dDbC617294c410',        nftCount: 1, datetime: new Date() },
  ];
  if(userList === undefined) {
    userList = sampleData;
  } else {
    for(let i in userList) {
      userList[i].index = Number(i)+1;
    }
  }

  // insert SampleData
  userList.map((item, index) => {  //SampleData.map((item, index) => {
    sheetHolderList.addRow(item);
    for(let i = 1; i <= sheetHolderList.columnCount; i++) {
      const cell = sheetHolderList.getRow(index + 2).getCell(i);
      switch (cell.col) {
        case 7:
          cell.style = ROW_DATE_STYLE; 
          break;
      
        default:
          cell.style = ROW_STYLE; 
          break;
      }
    }
  });
  
  return workbook;
}

module.exports = {
  makeExcelFile,
};