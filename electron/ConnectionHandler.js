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
        
        let connectionTypes = [
        ]
        
        connectionTypes.forEach((Connection)=> {
            let connection = new Connection();
            console.log("Registering Connection " + connection.name)
            this.connections.push(connection)
        })
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
            let encryptedMessage = EncryptionHandler.encryptMessage(device, message);
            this.connections.forEach((connection) => {
                connection.sendBytes(encryptedMessage, device)
            })
        })
    }

    sendMessageToAllDevices(message){
        let deviceIDs = []
        deviceCache.forEach((device) => {
            deviceIDs.push(device.id)
        })
        this.sendMessage(message, deviceIDs)
    }

    startSearch(){
        this.connections.forEach((connection) => connection.startSearch())
    }

    registerNewDevice(name, type, deviceID) {
        console.log("Found new Device " + name)

        deviceCache.push({
            name: name,
            icon: type,
            id: deviceID,
        })

        this.saveDeviceCache()
    }

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
        this.sendCacheToFrontend();
    }

    sendCacheToFrontend(){
        // TODO: Send devices to Frontend
        console.log("Sending Device Cache to Frontend");
        mainWindow.webContents.send('devices:update', this.getDeviceList());
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