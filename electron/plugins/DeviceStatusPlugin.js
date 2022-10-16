const Plugin = require("./Plugin")

class BatteryStatusPlugin extends Plugin{

    data = {}
    status = ""

    constructor(){
        super("batteryStatus")

        setInterval(() => this.fetchBatteryStatus(), 30000)
        setTimeout(() => this.fetchBatteryStatus(), 1000)
    }

    updateOwnStatus(status){
        this.status = status
    }

    fetchBatteryStatus(){
        // Get Status from other Devices
        this.sendMessage(this.status, undefined, (message, deviceID) => {
            let uuid = encryptionHandler.getUUID(deviceID)
            console.log("Got Device Status from " + uuid)
    
            this.data[uuid] = message
        })
    }
    
    handleIncomingMessage(message, deviceID, callback){
        let uuid = encryptionHandler.getUUID(deviceID)
        console.log("Got Device Status from " + uuid)
        this.data[uuid] = message

        callback(this.status);
    }

    // No Stats as the Battery Status is displayed natively
    getStats(deviceUUID){
        let stats = []

        if(this.hasMessage){
            stats.push({
                name: "Device Status",
                value: this.data[deviceUUID]
            })
        }

        return stats
    }

    getData(deviceUUID){
        return (this.data[deviceUUID] || {})
    }
}

module.exports = new BatteryStatusPlugin()