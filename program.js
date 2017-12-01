var PARSER = require('./parser.js');
var USERINPUT = require('./userInput.js');
var LOGGER = require('./logger.js');
var FILEWRITER = require('./fileWriter.js');    

var Excel = require('exceljs');

var filename = USERINPUT.getFilename();

LOGGER.log("Reading file : " + filename);

var workbook = new Excel.Workbook();
workbook.xlsx.readFile(filename)
    .then(function() {
        
        var sheetname = USERINPUT.getSheetname();
        
        LOGGER.log("Getting worksheet : " + sheetname);
        var worksheet = workbook.getWorksheet(sheetname);
        PARSER.setWorksheet(worksheet);

        LOGGER.log("Starting parsing process");
        PARSER.process(USERINPUT.getCellInfo());   
               
        FILEWRITER.writeTagsToFile(PARSER.getTags());
        FILEWRITER.writeSubTagsToFile(PARSER.getSubTags());
    });