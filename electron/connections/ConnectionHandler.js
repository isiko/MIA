const os = require('os');

const CacheHandler = require('./../CacheHandler')

class ConnectionHandler {

    handlers = [
        {
            name: 'devices:get',
            handler: () => this.getDeviceCache()
        }
    ]

    connections = []

    constructor(){
        this.cacheHandler = new CacheHandler("deviceCache", []);
    }

    /** 
     * Sends Message to all Connected Devices
     */
    sendMessageToAllDevices(message){
        let deviceIDs = []
        this.cacheHandler.cache.forEach((device) => {
            deviceIDs.push(device.id)
        })
        this.sendMessage(message, deviceIDs)
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

    /**
     * Registers a new Connectiontype with the Connectionhandler.
     * This is done by the super constructor of the ConnectionType class.
     * @param {ConnectionType} connectionType the new ConnectionType
     */
    registerConnectionType(connectionType){
        console.log("Registering Connection Type: " + connectionType.name);
        this.connections.push(connectionType);
    }

    /**
     * Handles Incoming Messages. This Method should be called from the connectionTypes when a Message is recieved
     * @param {Buffer} bytes the raw, encoded Message recieved
     * @param {String} deviceID The DeviceID of the Sending device
     */
    handleIncomingBytes(bytes, deviceID) {
        console.log("Handling incoming Bytes");
        let message = encryptionHandler.decryptMessage(bytes);
        pluginHandler.handleIncomingMessage(message, deviceID);
    }

    /**
     * Notifys all ConnectionTypes to start Searching for new Devices.
     * If a device is found, it is registered via the [registerNewDevice] Method
     */
    startSearch(){
        this.connections.forEach((connection) => connection.startSearch())
    }

    //TODO Make this more of an update function
    registerNewDevice(name, type, deviceID) {
        console.log("Found new Device " + name)

        if(this.isDeviceKnown(deviceID)){
            this.cacheHandler.cache.push({
                name: name,
                icon: type,
                id: deviceID,
            })
    
            this.updateDeviceCache()
        }
    }

    /**
     * Can be used to check if a device is allready registered
     * @param {String} deviceID The DeviceID to check for
     * @returns true if the device is registered or the deviceID matches the own ID
     */
    isDeviceKnown(deviceID){
        return this.cacheHandler.cache.find((device) => device.id === deviceID) === undefined && deviceID !== encryptionHandler.getDeviceID()
    }

    /**
     * Saves the current Device Cache and sends it to thr frontend
     */
    updateDeviceCache() {
        console.log("Saving Device List");
        this.cacheHandler.saveCache()

        console.log("Sending Device Cache to Frontend");
        mainWindow.webContents.send('devices:update', this.getDeviceCache());
    }

    //TODO remove dummy data
    getDeviceCache() {
        let deviceList = this.cacheHandler.cache;

        if(isDev) deviceList = deviceList.concat(this.getDummyData());
        
        return deviceList;
    }

    //TODO Make deviceType Changable via Settings
    /**
     * Can be used to fetch information about the device MIA is running on.
     * Should be used by the Connectiontypes during the Handshake.
     * @returns deviceData for the Device MIA is running on
     */
    getOwnDeviceData() {
        return {
            name: os.hostname(),
            id: encryptionHandler.getDeviceID(),
            type: 0,
        }
    }

    //TODO remove dummy data
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