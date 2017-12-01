{
    var FS = require('fs');

    function writeTagsToFile(data) {
        var fileName = "Tags.json";
        writeToFile(fileName, data);        
    }

    function writeSubTagsToFile(data) {
        var fileName = "SubTags.json";    
        writeToFile(fileName, data);        
    }

    // See reference -- http://stackabuse.com/writing-to-files-in-node-js/
    function writeToFile(filename, data) {
        var jsonString = JSON.stringify(data);

        var filepath = "./dataOutput/" + filename;

        // write to a new file named 2pac.txt
        FS.writeFile(filepath, jsonString, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;        
            // success case, the file was saved
            console.log(filepath + " saved!");
        });
    }
}

module.exports = {
    writeTagsToFile : writeTagsToFile,
    writeSubTagsToFile : writeSubTagsToFile
}