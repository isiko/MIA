const uuidV4 = require('uuid').v4;

class PluginHander {
    plugins = []
    callbacks = []

    handlers = [
        {
            name: 'plugins:getData',
            handler: (event, deviceID) => {
                let deviceUUID = /\r|\n/.exec(deviceID) ? encryptionHandler.getUUID(deviceID) : deviceID
                let data = []
                this.plugins.forEach((plugin) => {
                    let pluginData = plugin.getData(deviceUUID)
                    let pluginStats = plugin.getStats(deviceUUID)

                    if (pluginStats !== undefined) {
                        for (let stat of pluginStats)
                            stat.callback = undefined
                    }


                    data.push({
                        pluginName: plugin.name,
                        stats: pluginStats,
                        data: pluginData,
                    })
                })
                return data
            }
        },
        {
            name: 'plugins:runPluginCallback',
            handler: (event, deviceID, pluginName, ...args) => {
                return this.plugins.find(plugin => plugin.name === pluginName).runCallback(deviceID, ...args)
            }
        }
    ]

    registerPlugin(plugin){
        console.log("Registering Plugin " + plugin.name)
        this.plugins.push(plugin)
        return (message, deviceID, callback) => this.sendMessage(plugin.name, message, deviceID, callback)
    }

    sendMessage(pluginName, message, deviceID, callback, callbackID){
        const generatedCallbackID = this.#registerCallback(callback, callbackID)

        let messageJSON = {
            pluginName: pluginName,
            callbackID: generatedCallbackID,
            message: message,
        }

        if(deviceID !== undefined){
            connectionHandler.sendMessage(messageJSON, deviceID)
        } else {
            connectionHandler.sendMessageToAllDevices(messageJSON)
        }
    }

    handleIncomingMessage(message, deviceID) {

        // Extract Basic message Components
        const pluginName = message.pluginName
        const callbackID = message.callbackID
        const recievedMessag = message.message

        const callback = this.#getCallback(callbackID)

        // Is called when the Plugin decides to respond to the message
        const responseCallback = (response, newCallback) => {
            this.sendMessage(pluginName, response, deviceID, newCallback, callbackID)
        }
        
        if(callback === undefined){
            this.plugins.forEach((plugin) => {
                if (plugin.name === pluginName) {
                    plugin.handleIncomingMessage(recievedMessag, deviceID, responseCallback)
                }
            })
        } else {
            callback(message.message, deviceID, responseCallback)
        }
    }

    #registerCallback(callback, callbackID){
        if (callbackID === undefined)
        callbackID = uuidV4()
        
        console.log("Registering Callback: " + callbackID)

        this.callbacks[callbackID] = {
            callback: callback,
            start: Date.now(),
        }
        return callbackID
    }

    #getCallback(callbackID){
        if(this.callbacks[callbackID] !== undefined){
            return this.callbacks[callbackID].callback
        }
    }
}

module.exports = PluginHander