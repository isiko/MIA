const Plugin = require("./Plugin")

class HeartBeatPlugin extends Plugin{
    pingTiming = {}
    pingCounter = 0
    successfulCounter = {}
    answeredCounter = {}

    constructor(){
        super("heartBeat")

        this.beatCounter = 0
        setInterval(() => this.ping(), 30000)
        setTimeout(() => this.ping(), 1000)
    }

    ping(){
        this.pingCounter++
        this.sendMessage(
            {
                time: Date.now(),
                message: "ping"
            },
            undefined,
            (message, deviceID) => {
                let uuid = encryptionHandler.getUUID(deviceID)
                this.pingTiming[uuid] = Date.now() - message.time
                this.successfulCounter[uuid] = (this.successfulCounter[uuid] || 0) + 1
            }
        )
    }
    
    handleIncomingMessage(message, deviceID, callback){
        let uuid = encryptionHandler.getUUID(deviceID)
        console.log("Received HeartBeat from " + uuid)
        
        switch(message.message){
            case "ping":
                callback({
                    time: message.time,
                    message: "pong"
                });
                this.answeredCounter[uuid] = (this.answeredCounter[uuid] || 0) + 1
                break
            default:
                console.log("Unknown Message: " + message.message)
        }
    }

    getStats(deviceID){
        let stats = []
        
        stats.push({
            name: "Ping-Pong Time",
            value: this.pingTiming[deviceID] !== undefined ? `${(this.pingTiming[deviceID])}ms` : "No Response so far"
        })

        stats.push({
            name: "Successful Pings",
            value: (this.successfulCounter[deviceID] || 0)
        })

        stats.push({
            name: "Answered Pings",
            value: (this.answeredCounter[deviceID] || 0)
        })

        stats.push({
            name: "Sendt Pings",
            value: this.pingCounter
        })

        return stats
    }
}

module.exports = new HeartBeatPlugin()