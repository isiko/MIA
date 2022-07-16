const path = require('path');
const fs = require('fs');
const { app } = require('electron');

class CacheHandler {
    constructor(name){
        this.name = name;
        this.cache = {};
        this.cachePath = path.join(app.getPath("userData"), "cache", name + ".json");
        fs.mkdirSync(path.dirname(this.cachePath), {recursive: true})
        this.loadCache();
    }

    loadCache(){
        try{
            this.cache = JSON.parse(fs.readFileSync(this.cachePath));
        } catch (e){
            this.cache = {}
            this.saveCache();
        }
    }

    saveCache(){
        fs.writeFile(this.cachePath, JSON.stringify(this.cache), (err) => {if (err) throw err});
    }
}

module.exports = CacheHandler