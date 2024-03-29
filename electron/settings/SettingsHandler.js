const fs = require("fs");
const { app } = require('electron')

const settingsPath = app.getPath("userData") + "/settings.json";

class SettingsHandler {

    handlers = [
        {
            name: 'settings:get',
            handler: () => {
                if(this.settings === undefined){
                    return loadSettings();
                } else {
                    return this.settings;
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

    constructor(){
        // Setup
        this.loadSettings();
    }

    loadSettings(){
        console.log("Loading Settings");
    
        if(fs.existsSync(settingsPath)){
            console.log("Settings File Exists");
            this.settings = JSON.parse(fs.readFileSync(settingsPath));
        } else {
            console.log("Settings File Does Not Exist");
            this.settings = this.getDefaultSettings();
            this.saveSettings();
        }
        return this.settings;
    }
    
    changeSetting(settingIndex, sectionIndex, selectedIndex) {
        this.settings[sectionIndex].settings[settingIndex].currentSetting = selectedIndex;
        this.saveSettings();
        
        console.log(`Set "${this.settings[sectionIndex].settings[settingIndex].name}" of section "${this.settings[sectionIndex].name}" to "${selectedIndex}"`);
    }
    
    saveSettings(){
        console.log("Saving Settings");
        fs.writeFileSync(settingsPath, JSON.stringify(this.settings));
    }
    
    addSection(pSection){
        //Find a Section where the name is equal to section.name
        const existingSection = this.settings.find((section) => section.name === pSection.name);
        if(existingSection !== undefined){
            const sectionIndex = this.settings.indexOf(existingSection);
            console.log("Section already exists");
            
            this.settings[sectionIndex] = pSection;
            return new sectionHandler(sectionIndex);
        } else {
            console.log("Section does not exist");
            this.settings.push(pSection);
            return new sectionHandler(this.settings.indexOf(pSection));
        }
    }
    
    getDefaultSettings(){
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
}

class sectionHandler {
    constructor(section) {
        this.section = section;
    }

    getSettings() {
        return this.settings[this.section].settings;
    }

    updateSettings(settings) {
        this.settings[this.section].settings = this.settings;
    }
}

module.exports = SettingsHandler