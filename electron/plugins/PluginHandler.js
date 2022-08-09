const uuidV4 = require('uuid').v4;

class PluginHander {
    plugins = []
    callbacks = []

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