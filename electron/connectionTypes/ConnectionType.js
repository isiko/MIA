const Plugin = require('./../plugins/Plugin')

class ConenctionType extends Plugin {
    constructor(name){
        super(name)
    }

    startSearch(callback){}

    /**
     * Sends an encrypted Message to a specific Device
     * @param {Buffer} bytes The string of Bytes containing the encrypted Message to be send
     * @param {string} deviceID The target deviceID
     */
    sendBytes(bytes, deviceID){}

    handleConnectionData(metaData){}
}

module.exports = ConenctionType;