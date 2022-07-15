const CacheHandler = require('./../CacheHandler')

class Plugin {
    name

    constructor(name){
        this.name = name
        this.cacheHandler = new CacheHandler('plugin_' + this.name);

        this.sendMessage = PluginHandler.registerPlugin(this)
    }

    handleIncomingMessage(message, deviceID){}
}

module.exports = Plugin