const Plugin = require("./Plugin")

class MessagePlugin extends Plugin{

    lastMessage = {
        uuid: undefined,
        text: ""
    }

    hasMessage = false

    constructor(){
        super("message")
    }

    handleIncomingMessage(message, deviceID, callback){
        let uuid = encryptionHandler.getUUID(deviceID)
        console.log("Got Messag from " + uuid)

        this.lastMessage = {
            uuid: uuid,
            text: message
        }
        this.hasMessage = true
    }

    sendMessage(text){
        this.sendMessage(text, undefined, () => {})
    }

    // No Stats as the Battery Status is displayed natively
    getStats(deviceUUID){
        let stats = []

        getDeviceCache
        if(this.hasMessage){
            stats.push({
                name: "Last Message",
                value: `${(ConnectionHandler.getDeviceCache()[uuid].name)}: ${this.lastMessage.text}`
            })
        }

        return stats
    }

    getData(deviceUUID){
        return (this.lastMessage)
    }
}

module.exports = new MessagePlugin()