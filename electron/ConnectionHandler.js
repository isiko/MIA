const fs = require('fs');
const { app } = require('electron');

const deviceCachePath = app.getPath("userData") + "/deviceCache.json";

class ConnectionHandler {

    handlers = [
        {
            name: 'devices:get',
            handler: () => this.getDeviceList()
        }
    ]

    constructor(){
        this.loadDeviceCache();
    }

    /**
     * Sends a preformated message
     * @param {JSON} message The message to send
     * @param {string} deviceID The target device ID. If it is not set, the message will be sent to all known devices
     */
    sendMessage(message, deviceID){
        console.log("Sending Message");
        console.log("Device Key: " + deviceKey);
        
        let encryptedMessage = EncryptionHandler.encryptMessage(deviceID, message);
        console.log("Encrypted Message: " + encryptedMessage);

        //TODO: send encrypted message to device
    }

    /**
     * Sends a new Public Key to all Peers
     */
    spreadNewDeviceID(){
        console.log("Updating DeviceID");

        //TODO: send new public key to all peers
    }

    //TODO: implement this
    startSearch(){}

    loadDeviceCache() {
        console.log("Loading Device Cache");
        console.log("Device Cache Path: " + deviceCachePath);

        if(fs.existsSync(deviceCachePath)){
            console.log("Found existing Device List");
            global.deviceCache = JSON.parse(fs.readFileSync(deviceCachePath));
        } else {
            console.log("Device List Does Not Exist");
            global.deviceCache = [];
            this.saveDeviceCache();
        }

        return deviceCache;
    }

    saveDeviceCache() {
        console.log("Saving Device List");
        fs.writeFileSync(deviceCachePath, JSON.stringify(deviceCache));
    }

    getDeviceList() {
        if(deviceCache === undefined){
            this.loadDeviceCache();
        }

        let deviceList = deviceCache;
        
        if(isDev) deviceList = deviceList.concat(this.getDummyData());
        
        return deviceList;
    }

    getDummyData() {
        return [
            {
                icon: 0,
                name: "Device 1",
            },
            {
                icon: 1,
                name: "Device 2",
            },
            {
                icon: 2,
                name: "Device 3",
            },
            {
                icon: 2,
                name: "Device 4",
            }
        ]
    }
}

module.exports = ConnectionHandler