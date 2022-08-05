const ConenctionType = require("./ConnectionType");
const net = require('net');
const SSDP = require('node-ssdp');
const { app } = require("electron");

const deviceURN = 'urn:mobile-integration-application:device'
const tcpPort = 1371

class LanConnectionType extends ConenctionType {
    ipAddr;

    ssdpClient
    ssdpServer

    tcpServer
    sockets = {};
    
    constructor(){
        super("lan");

        console.log("Loading IP Address Cache");
        this.ipAddr = this.cacheHandler.cache.ipAddr;
        this.ipAddr = this.ipAddr === undefined ? {} : this.ipAddr;
        console.log(this.ipAddr);

        this.#setupTCP();
        this.#setupSSDP();

        this.startSearch();
        
        app.on('before-quit', () => {
            console.log("Saving IP Cache");
            this.cacheHandler.cache = {
                ipAddr: this.ipAddr,
            }
            this.cacheHandler.saveCache();

            console.log("Stopping SSDP Server");
            this.server.stop()
        })
    }

    #setupTCP(){
        // Create TCP Server
        this.tcpServer = net.createServer();
        this.tcpServer.listen(tcpPort, () => {
            console.log(`TCP Server listening on port ${tcpPort}`)
        });

        // Setup TCP Server Event Handlers
        this.tcpServer.on('connection', (socket) => this.#handleTcpSocket(socket));
    }

    #setupSSDP(){
        // Setup SSDP Client
        this.ssdpClient = new SSDP.Client({});
        this.ssdpClient.on('response', (headers, statusCode, rinfo) => this.#handleDeviceCandidate(headers, statusCode, rinfo));

        // Setup SSDP Server
        console.log("Setting up SSDP Server");
        this.ssdpServer = new SSDP.Server({
            udn: `uuid:${encryptionHandler.getUUID()}`,
        });
        this.ssdpServer.addUSN(deviceURN);
        this.ssdpServer.start()
    }

    #handleTcpSocket(socket){
        let uuid = undefined
        let deviceID = undefined
        let incomingBuffer = ""

        console.log("TCP Connection recieved with " + socket.remoteAddress);

        // Send DeviceID
        socket.write(JSON.stringify({
            messageType: "deviceData",
            data: connectionHandler.getOwnDeviceData()
        }));

        // Handle Incomming Messages
        socket.on('data', (data) => {
            console.log("TCP Data recieved");
            incomingBuffer = incomingBuffer + data.toString();
            try{
                let message = JSON.parse(incomingBuffer);
                switch(message.messageType){
                    case "deviceData":
                        console.log(`Got Device Data from ${message.data.name} (${encryptionHandler.getUUID(message.data.id)})`);
                        connectionHandler.registerNewDevice(message.data.name, message.data.type, message.data.id);
                        uuid = encryptionHandler.getUUID(message.data.id);
                        this.sockets[uuid] = socket;
                        break;
                    case "message":
                        console.log("Got Message from " + uuid);
                        connectionHandler.handleIncomingBytes(message.data, deviceID);
                        break;
                    default:
                        console.log("Unknown Message Type: " + message.messageType);
                }
                incomingBuffer = ""
            } catch (e){
                if (e.name === "SyntaxError" && e.message === "Unexpected end of JSON input"){
                    console.log("TCP Data incomplete");
                } else {
                    console.log("Error while Parsing Data: " + e);
                    incomingBuffer = ""
                }
            }
        })

        // Handle Disconnect
        socket.on('end', () => {
            console.log("TCP Connection closed with " + socket.remoteAddress);
            delete this.sockets[uuid];
        })
    }

    #openTCPConnection(deviceUUID){
        // Open TCP Connection
        console.log("Opening TCP Connection to " + this.ipAddr[deviceUUID]);
        if (this.ipAddr[deviceUUID] !== undefined){
            let tcpSocket = net.createConnection(tcpPort, this.ipAddr[deviceUUID]);
            tcpSocket.on('connect', () => this.#handleTcpSocket(tcpSocket));
            this.sockets[deviceUUID] = tcpSocket
            return true;
        } else {
            console.log("Could not find IP Address for " + deviceUUID);
            return false;
        }
    }

    #handleDeviceCandidate(headers, statusCode, rinfo){
        let deviceUUID = headers.USN.split(":")[1];
        
        // Check if the Service Type is a MIA Device
        if(headers.ST !== deviceURN)
            return;

        // Check if the candidate is not the own device
        if (deviceUUID === encryptionHandler.getUUID())
            return;

        this.ipAddr[deviceUUID] = rinfo.address;
        
        // Open TCP Connection
        this.#openTCPConnection(deviceUUID);
    }
    
    startSearch(){
        console.log("Starting LAN Search")
        this.ssdpClient.search(deviceURN)
    }

    stopSearch(){
        console.log("Stopping LAN Search")
        this.ssdpClient.stop()
    }

    sendBytes(bytes, deviceID){
        let uuid = encryptionHandler.getUUID(deviceID);
        if(this.sockets[uuid] === undefined)
            this.#openTCPConnection(uuid);

        console.log("Sending bytes to " + uuid);
        this.sockets[uuid].write(JSON.stringify({
            messageType: "message",
            data: bytes
        }));
    }

    connect(deviceID){
        let uuid = encryptionHandler.getUUID(deviceID);
        return this.#openTCPConnection(uuid);
    }

    isConnected(deviceID){
        let uuid = encryptionHandler.getUUID(deviceID);
        return this.sockets[uuid] !== undefined;
    }
}

module.exports = new LanConnectionType();