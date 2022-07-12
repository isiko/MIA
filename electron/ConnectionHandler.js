const fs = require('fs');

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
    handlers: [
        {
            name: 'devices:get',
            handler: () => getDeviceList()
        }
    ]
}