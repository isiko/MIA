const Plugin = require("./Plugin")

class HeartBeatPlugin extends Plugin{
    pingTiming = {}

    constructor(){
        super("heartBeat")

        this.beatCounter = 0
        setInterval(() => this.sendMessage({
            time: Date.now(),
            message: "ping"
        },undefined, (message, deviceID)=>{
            this.pingTiming[encryptionHandler.getUUID(deviceID)] = Date.now() - message.time
            console.log("Ping-Pong Time: " + this.pingTiming[encryptionHandler.getUUID(deviceID)])
        }), 30000)
    }

    handleIncomingMessage(message, deviceID, callback){
        console.log("Received HeartBeat from " + encryptionHandler.getUUID(deviceID))
        
        switch(message.message){
            case "ping":
                callback({
                    time: message.time,
                    message: "pong"
                });
                break
            default:
                console.log("Unknown Message: " + message.message)
        }
    }
}

module.exports = new HeartBeatPlugin()