const Plugin = require("./Plugin")

class HeartBeatPlugin extends Plugin{
    pingTiming = {}

    constructor(){
        super("heartBeat")

        this.beatCounter = 0
        setInterval(() => this.sendMessage({
            time: Date.now(),
            message: "ping"
        }), 30000)
    }

    handleIncomingMessage(message, deviceID){
        console.log("Received HeartBeat from " + encryptionHandler.getUUID(deviceID))
        
        switch(message.message){
            case "ping":
                this.sendMessage({
                    time: message.time,
                    message: "pong"
                });
                break
            case "pong":
                this.pingTiming[encryptionHandler.getUUID(deviceID)] = Date.now() - message.time
                console.log("Ping-Pong Time: " + this.pingTiming[encryptionHandler.getUUID(deviceID)])
                break
            default:
                console.log("Unknown Message: " + message.message)
        }
    }
}

module.exports = new HeartBeatPlugin()