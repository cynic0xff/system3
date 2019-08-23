class Config {
    
    constructor(debug) {
        
        this.debug = false;

        if(debug)
            console.log(`Calling config constructor ${debug}`);
    }
}

module.exports = Config;