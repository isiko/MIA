const fs = require("fs");

function loadSettings(){
    console.log("Loading Settings");

    if(fs.existsSync(settingsPath)){
        console.log("Settings File Exists");
        global.settings = JSON.parse(fs.readFileSync(settingsPath));
    } else {
        console.log("Settings File Does Not Exist");
        global.settings = getDefaultSettings();
        saveSettings();
    }
    return settings;
}

function changeSetting(settingIndex, sectionIndex, selectedIndex) {
    settings[sectionIndex].settings[settingIndex].currentSetting = selectedIndex;
    saveSettings();
    
    console.log(`Set "${settings[sectionIndex].settings[settingIndex].name}" of section "${settings[sectionIndex].name}" to "${selectedIndex}"`);
}

function saveSettings(){
    console.log("Saving Settings");
    fs.writeFileSync(settingsPath, JSON.stringify(settings));
}

function getDefaultSettings(){
    return [
        {
            name: "Multi Option Test Section",
            settings: [
                {
                    name: "Test Setting",
                    currentSetting: 0,
                    options: [
                        "Option 1",
                        "Option 2",
                        "Option 3",
                    ]
                }
            ]
        },
        {
            name: "Binary Test Section",
            settings: [
                {
                    name: "Binary Test Setting",
                    currentSetting: 0,
                    options: [
                        "Off",
                        "On",
                    ]
                },
                {
                    name: "Binary Test Setting with 0 options",
                    currentSetting: 0,
                    options: [
                    ]
                },
                {
                    name: "Binary Test Setting with null options",
                    currentSetting: 0,
                },
                {
                    name: "Non binary Test Setting",
                    currentSetting: 0,
                    notBinary: true,
                    options: [
                        "Option 1",
                        "Option 2",
                    ]
                }
            ]
        }
    ]
}

// Setup
loadSettings();

module.exports = {
    loadSettings,
    saveSettings,
    getDefaultSettings,
    changeSetting,
    handlers: [
        {
            name: 'settings:get',
            handler: () => {
                if(settings === undefined){
                    return loadSettings();
                } else {
                    return settings;
                }
            },
        },
        {
            name: 'settings:change',
            handler: (event, settingIndex, sectionIndex, selectedIndex) => {
                changeSetting(settingIndex, sectionIndex, selectedIndex);
            }
        }
    ]
}