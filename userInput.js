{
    var CELL = require('./cell.js');

    function getFilename() {
        return "./data/Takeda Scientific platform MasterDocumentList_v0.12.xlsx";
    }
    
    function getCellInfo() {
        var parentTagStartCell = new CELL.Cell();
        parentTagStartCell.row = "3";
        parentTagStartCell.column = "F";

        var subTagStartCell = new CELL.Cell();
        subTagStartCell.row = "4";
        subTagStartCell.column = "F";

        var cellInfo = new Array();
        cellInfo.push(parentTagStartCell);
        cellInfo.push(subTagStartCell);

        return cellInfo;
    }

    function getSheetname() {
        return "Master List";
    }
}

module.exports = {
    getFilename : getFilename,
    getCellInfo : getCellInfo,
    getSheetname : getSheetname
};