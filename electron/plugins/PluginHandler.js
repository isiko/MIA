class PluginHander {
    plugins = []

    registerPlugin(plugin){
        console.log("Registering Plugin " + plugin.name)
        this.plugins.push(plugin)
        return (message, deviceID) => this.sendMesssage(plugin.name, message, deviceID)
    }

    sendMesssage(pluginName, message, deviceID){
        let messageJSON = {
            pluginName: pluginName,
            message: message,
        }

        if(deviceID !== undefined){
            connectionHandler.sendMesssage(messageJSON, deviceID)
        } else {
            connectionHandler.sendMessageToAllDevices(messageJSON)
        }
    }

    handleIncomingMessage(message, deviceID) {
        this.plugins.forEach((plugin) => {
            if (plugin.name === message.pluginName){
                plugin.handleIncomingMessage(message.message, deviceID)
            }
        })
    }
}

module.exports = PluginHander