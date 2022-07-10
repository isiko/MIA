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
    
]

module.exports = handlers 