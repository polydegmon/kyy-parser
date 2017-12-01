{    
    var CELL = require('./cell.js');
    var TAG = require('./tag.js');
    var SUBTAG = require('./subtag.js');    
    var LOGGER = require('./logger.js');        

    var Excel = require('exceljs');
    var worksheet;

    // This is the cells containing the chapters
    var parentTagStartCell;
    // This is the cells containing the tags and subtags
    var subTagStartCell;
    // Not needed yet
    var dataStartCell;

    var tags;
    var subTags;  

    function setWorksheet(ws) {
        worksheet = ws;
    }

    function setup(cellInfo) {
        LOGGER.log("Setting up cell references");    

        parentTagStartCell = new CELL.Cell(cellInfo[0].row, cellInfo[0].column);
        LOGGER.log("Tag Start Cell - " + parentTagStartCell.column + ":" + parentTagStartCell.row)

        subTagStartCell = new CELL.Cell(cellInfo[1].row, cellInfo[1].column);
        LOGGER.log("Subtag Start Cell - " + subTagStartCell.column + ":" + subTagStartCell.row)

        // Not needed atm
        //dataStartCell = new Cell(cellInfo[2]);
    }

    function getCellText(cell) {
        return worksheet.getCell(cell.toCell()).value;        
    }

    function getChapterNumber(name) {
        
        var number = 0;

        var matches = name.match(/\d+/);
        
        if (matches) {
            number = matches[0];
        } 

        number = parseInt(number, 10);

        return number;
    }

    function createTag(id, name) {
        LOGGER.log("Creating tag " + id);

        var tag = new TAG.Tag();
        tag.id = id;
        tag.name = name;

        return tag;
    }

    function createSubTag(id, name, parent) {
        LOGGER.log("Creating subtag " + id);

        var subTag = new SUBTAG.SubTag();
        subTag.id = parent + "." + id;
        subTag.name = name;
        subTag.parent = parent;

        return subTag;
    }   

    //go to tag start cell
    //get the chapter name - strip the name and leave the number    
    //go to the subtag start cell
    //get the tag text
    //create the tag with this info

    //move forward in the tag start cell
    // if no data is found
    //  move to the subtag cell under the current cell
    //  create the subtag with the information
    // if data is found
    // go to top of loop
    function process(cellInfo) {

        setup(cellInfo);

        var finished = false;
        var subTagId = 1;
        var newTag = true;

        LOGGER.log("Parser process starting");

        var chapter = null;
        var chapterNumber = null;

        tags = new Array();
        subTags = new Array();

        while(finished === false) {

            if (newTag) {
                chapter = getCellText(parentTagStartCell);            
                chapterNumber = getChapterNumber(chapter);    

                // The first sub tag in the excel file is the main tag
                var tagName = getCellText(subTagStartCell);
                var tag = createTag(chapterNumber, tagName);
                tags.push(tag);
                
                // Reset the sub tag id
                subTagId = 1;
                newTag = false;
            }

            var subTagName = getCellText(subTagStartCell);                
            var subTag = createSubTag(subTagId, subTagName, chapterNumber);
            subTags.push(subTag);
            subTagId++;

            moveAllCellsForwardOneCell();
            
            // If there's data restart the loop
            if (isNewTag(parentTagStartCell)) newTag = true;

            finished = isFinished(parentTagStartCell, subTagStartCell, subTagId);            
        }

        LOGGER.log("Parser process completed");      
    }
    
    function isFinished(parentTagStartCell, subTagStartCell, subTagId) {
        if (subTagId === 13) {
            var t = "ff";
        }
        var ptext = getCellText(parentTagStartCell);
        var stext = getCellText(subTagStartCell);

        if (!ptext && !stext) {
            return true;
        }

        return false;
    }

    // TODO: this could be done better
    var previousValue = null;
    function isNewTag(parentTagStartCell) {
        var value = getCellText(parentTagStartCell);
        
        // Initial case
        if (previousValue === null) {
            previousValue = value;
            return false;
        }

        if (value === previousValue) {
            return false;
        } else {
            previousValue = value;
            return true;
        }        
    }

    function moveAllCellsForwardOneCell() {
        parentTagStartCell.moveForward();
        subTagStartCell.moveForward();
    }

    function getTags() {        
        return tags;
    }

    function getSubTags() {        
        return subTags;
    }
}

module.exports = {
    process : process,
    setWorksheet : setWorksheet,
    getTags : getTags,
    getSubTags : getSubTags   
}