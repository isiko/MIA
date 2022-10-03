const { powerMonitor } = require("electron")
const batteryLevel = require('battery-level');

const Plugin = require("./Plugin")

class BatteryStatusPlugin extends Plugin{

    data = {}
    status = {
        percentage: undefined,
        charging: powerMonitor.isOnBatteryPower(),
        batteryPowered: connectionHandler.getOwnDeviceData().type !== 0,
    }

    constructor(){
        super("batteryStatus")

        setInterval(() => this.fetchBatteryStatus(), 30000)
        setTimeout(() => this.fetchBatteryStatus(), 1000)
    }

    updateOwnStatus(){
        this.status.charging = powerMonitor.isOnBatteryPower()
        this.status.batteryPowered = connectionHandler.getOwnDeviceData().type !== 0
        batteryLevel()
            .then(level => {
                this.status.percentage = level
            })
            .catch(err => {
                this.status.percentage = undefined
                this.status.batteryPowered = false
                this.status.charging = undefined
            })
    }

    fetchBatteryStatus(){
        this.updateOwnStatus();

        // Get Status from other Devices
        this.sendMessage(this.status, undefined, (message, deviceID) => {
            let uuid = encryptionHandler.getUUID(deviceID)
            console.log("Got Battery Status from " + uuid)
    
            this.data[uuid] = message
        })
    }
    
    handleIncomingMessage(message, deviceID, callback){
        let uuid = encryptionHandler.getUUID(deviceID)
        console.log("Got Battery Status from " + uuid)
        this.data[uuid] = message

        callback(this.status);
    }

    // No Stats as the Battery Status is displayed natively
    getStats(deviceUUID){
        let stats = []

        return stats
    }

    getData(deviceUUID){
        return (this.data[deviceUUID] || {})
    }
}

module.exports = new BatteryStatusPlugin()