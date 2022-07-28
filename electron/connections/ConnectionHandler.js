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

    connections = []

    constructor(){
        this.loadDeviceCache();
    }

    /**
     * Sends a preformated message
     * @param {JSON} message The message to send
     * @param {string or string[]} deviceID The target device ID. If it is not set, the message will be sent to all known devices
     */
    sendMessage(message, deviceID){
        console.log("Sending Message");

        let devices = []

        if(Array.isArray(deviceID)){
            devices = deviceID
        } else {
            devices.push(deviceID)
        }

        devices.forEach((device) => {
            let encryptedMessage = encryptionHandler.encryptMessage(device, message);
            this.connections.forEach((connection) => {
                connection.sendBytes(encryptedMessage, device)
            })
        })
    }

    sendMessageToAllDevices(message){
        let deviceIDs = []
        this.deviceCache.forEach((device) => {
            deviceIDs.push(device.id)
        })
        this.sendMessage(message, deviceIDs)
    }

    startSearch(){
        this.connections.forEach((connection) => connection.startSearch())
    }

    registerNewDevice(name, type, deviceID) {
        console.log("Found new Device " + name)

        if(this.deviceCache.find((device) => device.id === deviceID) === undefined){
            this.deviceCache.push({
                name: name,
                icon: type,
                id: deviceID,
            })
    
            this.saveDeviceCache()
        }
    }

    loadDeviceCache() {
        console.log("Loading Device Cache");
        console.log("Device Cache Path: " + deviceCachePath);

        if(fs.existsSync(deviceCachePath)){
            console.log("Found existing Device List");
            this.deviceCache = JSON.parse(fs.readFileSync(deviceCachePath));
        } else {
            console.log("Device List Does Not Exist");
            this.deviceCache = [];
            this.saveDeviceCache();
        }

        return this.deviceCache;
    }

    saveDeviceCache() {
        console.log("Saving Device List");
        fs.writeFileSync(deviceCachePath, JSON.stringify(this.deviceCache));
        this.sendCacheToFrontend();
    }

    sendCacheToFrontend(){
        // TODO: Send devices to Frontend
        console.log("Sending Device Cache to Frontend");
        mainWindow.webContents.send('devices:update', this.getDeviceList());
    }

    getDeviceList() {
        if(this.deviceCache === undefined){
            this.loadDeviceCache();
        }

        let deviceList = this.deviceCache;
        
        if(isDev) deviceList = deviceList.concat(this.getDummyData());
        
        return deviceList;
    }

    registerConnectionType(connectionType){
        console.log("Registering Connection Type: " + connectionType.name);
        this.connections.push(connectionType);
    }

    // TODO Make this not hardcoded
    getOwnDeviceData() {
        return {
            name: "My Device (Laptop)",
            id: encryptionHandler.getDeviceID(),
            type: 0,
        }
    }

    handleIncomingBytes(bytes, deviceID) {
        console.log("Handling incoming Bytes");
        let message = encryptionHandler.decryptMessage(bytes);
        pluginHandler.handleIncomingMessage(message, deviceID);
    }

    getDummyData() {
        return [
            {
                icon: 0,
                name: "Device 1",
                id: "asdfasdfasdf1"
            },
            {
                icon: 1,
                name: "Device 2",
                id: "asdfasdfasdf2"
            },
            {
                icon: 2,
                name: "Device 3",
                id: "asdfasdfasdf3"
            },
            {
                icon: 2,
                name: "Device 4",
                id: "asdfasdfasdf4"
            }
        ]
    }
}

module.exports = ConnectionHandler