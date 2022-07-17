const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { app } = require('electron')
const { safeStorage } = require("electron");

const basePath = path.join(app.getPath("appData"), app.getName(), 'keys');
const privateKeyPath = path.join(basePath, "private.key");
const publicKeyPath = path.join(basePath, "public.key");

class EncryptionHandler {
    publicKey = undefined;
    #privateKey = undefined;
    keyCreationDateMs = undefined;

    privateKeyEncoding = {
        type: 'pkcs8',
        format: 'pem',
    }

    publicKeyEncoding = {
        type: 'spki',
        format: 'pem'
    }

    constructor(){
        fs.mkdirSync(path.dirname(privateKeyPath), { recursive: true });
        fs.mkdirSync(path.dirname(publicKeyPath), { recursive: true });

        this.loadKeyPair();     
    }

    encryptMessage(deviceID, message){
        console.log("Encrypting Message");
        let deviceKey = this.convertDeviceKeyToPublicKey(deviceID);
        let encryptedMessage = crypto.publicEncrypt(deviceKey, JSON.stringify(message));
        return encryptedMessage;
    }

    decryptMessage(message){
        return crypto.privateDecrypt(this.#privateKey, message);
    }

    convertDeviceKeyToPublicKey(deviceKey){
        return crypto.createPublicKey(deviceKey);
    }

    convertPublicKeytoDeviceKey(publicKey){
        return publicKey.export(this.publicKeyEncoding);
    }

    generateKeyPair(){
        console.log("Generating new Key Pair");

        this.publicKey = undefined;
        this.privateKey = undefined;

        crypto.generateKeyPair('rsa', {
            modulusLength: 4096,
          }, (err, publicKey, privateKey) => {
            if(err) throw err;

            // Save Keypair
            this.publicKey = publicKey
            this.privateKey = privateKey

            this.saveKeyPair()
            connectionHandler.spreadNewDeviceID();
          });
    }

    /**
     * Checks if a keypair is available
     * @returns {string} Returns true if Encryption is currently available, in any other case false
     */
    isAvailable(){
        return this.publicKey != undefined && this.#privateKey != undefined;
    }

    getDeviceID(){
        return this.convertPublicKeytoDeviceKey(this.publicKey);
    }

    regeneratePublicKey(){
        console.log("Regenerating Public Key");
        this.publicKey = crypto.createPublicKey(this.#privateKey);
        this.saveKeyPair();
    }

    loadKeyPair(){
        if (!fs.existsSync(privateKeyPath)) {
            console.log("Private Key Does Not Exist");
            this.generateKeyPair();
        } else {
            console.log("Found existing Private Key");
            this.loadPrivateKey();
            if (!fs.existsSync(publicKeyPath)) {
                console.log("Public Key Does Not Exist");
                this.regeneratePublicKey();
            } else {
                console.log("Found existing Public Key");
                this.loadPublicKey();
            }
        }
    }

    loadKeyCreationDate(){
        this.keyCreationDateMs = fs.statSync(privateKeyPath).birthtimeMs;
        console.log("Key Creation Date: " + new Date(this.keyCreationDateMs).toUTCString());
    }

    loadPrivateKey(){
        console.log("Loading Private Key from " + privateKeyPath);
        this.privateKey = crypto.createPrivateKey(safeStorage.decryptString(fs.readFileSync(privateKeyPath)));
    }
    
    loadPublicKey(){
        console.log("Loading Public Key from " + publicKeyPath);
        this.publicKey = crypto.createPublicKey(fs.readFileSync(publicKeyPath));
    }

    saveKeyPair(){
        console.log("Saving Key Pair");
        this.savePrivateKey();
        this.savePublicKey();
        this.loadKeyCreationDate();
    }

    savePublicKey(){
        fs.writeFile(publicKeyPath, this.publicKey.export(this.publicKeyEncoding), (err) => {
            if (err) throw err
        })
    }
    
    savePrivateKey(){
        let keyString = this.#privateKey.export(this.privateKeyEncoding);
        let encryptedKey = safeStorage.encryptString(keyString);
        fs.writeFile(privateKeyPath, encryptedKey, (err) => {
            if (err) throw err
        })
    }
}

module.exports = EncryptionHandler