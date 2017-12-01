{    
    function Tag() {

        // This is the chapter number    
        this.id = null;

        // This is the tag text
        this.name = null;
        
        this.checked = false;
        this.createdAt = null;
        this.updatedAt = null;  
    }
}

module.exports = {
    Tag : Tag
}