const os = require('os');

const CacheHandler = require('./../CacheHandler')

class ConnectionHandler {

    handlers = [
        {
            name: 'devices:get',
            handler: () => this.getDeviceCache()
        },
        {
            name: 'devices:getMessageLog',
            handler: (event, deviceID) => this.messageLog[deviceID] === undefined ? [] : this.messageLog[deviceID]
        }
    ]

    connections = []

    messageLog = {}

    constructor(){
        this.cacheHandler = new CacheHandler("deviceCache");
    }

    /** 
     * Sends Message to all Connected Devices
     */
    sendMessageToAllDevices(message){
        let deviceIDs = []
        for(let device in this.getDeviceCache()){
            deviceIDs.push(this.getDeviceCache()[device].id)
        }
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
            
            let encryptedMessage = undefined
            try {
                let deviceKey = this.getDeviceCache()[encryptionHandler.getUUID(device)].id
                encryptedMessage = encryptionHandler.encryptMessage(deviceKey, message);
            } catch (error) {
                console.log("Error while encrypting message: " + error);
            }
            
            if(encryptedMessage !== undefined){
                this.connections.forEach((connection) => {
                    connection.sendBytes(encryptedMessage, device)
                })
                this.logMessage(message, device, "sendt")
            }
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
        console.log("Handling incoming Bytes from " + encryptionHandler.getUUID(deviceID));
        let message = JSON.parse(encryptionHandler.decryptMessage(bytes).toString());

        this.logMessage(message, deviceID, "recieved")
        pluginHandler.handleIncomingMessage(message, deviceID);
    }

    logMessage(message, deviceID, type){
        let uuid = encryptionHandler.getUUID(deviceID)
        if (this.messageLog[uuid] === undefined) {
            this.messageLog[uuid] = []
        }

        this.messageLog[uuid].push({
            type: type,
            message: message,
            timestamp: Date.now(),
        })
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

        if(this.isDeviceUnknown(deviceID)){
            this.cacheHandler.cache[deviceID] = {
                name: name,
                icon: type,
                id: deviceID
            }
    
            this.updateDeviceCache()
        }
    }

    /**
     * Can be used to check if a device is allready registered
     * @param {String} deviceID The DeviceID to check for
     * @returns true if the device is registered or the deviceID matches the own ID
     */
    isDeviceUnknown(deviceID){
        return this.getDeviceCache()[deviceID] === undefined && deviceID !== encryptionHandler.getDeviceID()
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

    getDeviceCache() {
        let deviceList = {};

        for(let device in this.cacheHandler.cache){
            let uuid = encryptionHandler.getUUID(device)
            deviceList[uuid] = this.cacheHandler.cache[device]
            deviceList[uuid].id = device
        }
        
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
}

module.exports = ConnectionHandler