{  
    function Cell(row, column) {
        this.row = row;
        this.column = column;

        this.toCell = function() {
            return this.column + this.row;
        }

        // This is for the simple case - it gets annoying when you can have x number of letters in the column location
        this.moveForward = function() {                             
            var address = this.column.toString().split('');            
            this.column = handleCellMapping(address);
        }

        // This will only work for 2 letter column locations
        function handleCellMapping(address) {            
            if (address.length == 1) {
                var letter = address[0];

                if (letter === 'z' || letter === 'Z') {
                    return "AA";
                } else {
                    return letter = String.fromCharCode(letter.charCodeAt(0) + 1);                    
                }               
            } else if (address.length == 2) {
                var lastLetter = address[1];
                var secondLastLetter = address[0];

                if (lastLetter === 'z' || lastLetter === 'Z') {
                    lastLetter = 'A';
                    secondLastLetter = String.fromCharCode(secondLastLetter.charCodeAt(0) + 1);
                } else {
                    lastLetter = String.fromCharCode(lastLetter.charCodeAt(0) + 1);                    
                }

                return secondLastLetter.concat(lastLetter);
            }
        }

        function isLetterZ(letter) {
            return (letter === 'z' || letter === 'Z');
        }

        this.moveDown = function() {
            // move down a row
        }
    }
}

module.exports = {
    Cell : Cell
}