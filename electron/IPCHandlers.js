const handlers = [{
        name: 'devices:get',
        handler: () => {
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
    },
    {
        name: 'settings:get',
        handler: () => {
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
]

module.exports = handlers 