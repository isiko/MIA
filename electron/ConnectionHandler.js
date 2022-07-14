const fs = require('fs');

function sendMessage(deviceID, message){
    console.log("Sending Message");
    console.log("Device Key: " + deviceKey);
    
    let encryptedMessage = EncryptionHandler.encryptMessage(deviceID, message);
    console.log("Encrypted Message: " + encryptedMessage);

    //TODO: send encrypted message to device
}

/**
 * Sends a new Public Key to all Peers
 */
function spreadNewDeviceID(){
    console.log("Updating DeviceID");

    //TODO: send new public key to all peers
}

function loadDeviceCache() {
    console.log("Loading Device Cache");
    console.log("Device Cache Path: " + deviceCachePath);

    if(fs.existsSync(deviceCachePath)){
        console.log("Found existing Device List");
        global.deviceCache = JSON.parse(fs.readFileSync(deviceCachePath));
    } else {
        console.log("Device List Does Not Exist");
        global.deviceCache = [];
        saveDeviceCache();
    }

    return deviceCache;
}

function saveDeviceCache() {
    console.log("Saving Device List");
    fs.writeFileSync(deviceCachePath, JSON.stringify(deviceCache));
}

function getDeviceList() {
    if(deviceCache === undefined){
        loadDeviceCache();
    }

    let deviceList = deviceCache;
    
    if(isDev) deviceList = deviceList.concat(getDummyData());
    
    return deviceList;
}

function getDummyData() {
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

loadDeviceCache();

module.exports = {
    loadDeviceCache,
    saveDeviceCache,
    getDeviceList,
    spreadNewDeviceID,
    sendMessage,
    handlers: [
        {
            name: 'devices:get',
            handler: () => getDeviceList()
        }
    ]
}