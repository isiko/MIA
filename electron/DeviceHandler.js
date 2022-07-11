const fs = require('fs');

function loadDevices() {
    console.log("Loading Device List");

    if(fs.existsSync(deviceListPath)){
        console.log("Found existing Device List");
        global.deviceList = JSON.parse(fs.readFileSync(deviceListPath));
    } else {
        console.log("Device List Does Not Exist");
        global.deviceList = [];
        saveDevices();
    }

    if (isDev) deviceList = deviceList.concat(getDummyData());

    return deviceList;
}

function saveDevices() {
    console.log("Saving Device List");
    fs.writeFileSync(deviceListPath, JSON.stringify(deviceList));
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

loadDevices();

module.exports = {
    handlers: [
        {
            name: 'devices:get',
            handler: () => {
                if(deviceList === undefined){
                    loadDevices();
                }
                return deviceList;
            }
        }
    ]
}