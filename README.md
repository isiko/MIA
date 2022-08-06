# MIA
The Mobile-Integration-Application (short MIA) is my attempt to recreate the integration Apple has created between its Devices (i.e. iPads, MacBooks, ...) for other Operating Systems. It should be noted that the Goal is not to 100% recreate Apples System 1:1, as that would (as far as I know) not be Impossible.

## Installation
The App is still a Work in Progress, so the Installation Guide will be added as soon as it is usable.

## Development
This Project is currently in a very early Development phase, so currently it's not that easy to help with development. If you do want to help though, don't hesitate to send me an E-Mail, maybe it'll work fine. Especially the EncryptionHandler should be checked as I'm not that experienced with encryption.

## Goals
### Usability
You should not have to perform some kind of ritual to connect your Devices. Once Paired, everything should work automatically and without any action from the user. Also, there should be fallbacks to ensure a good connection even if one connection type fails.

I'm planning to implement the following connection types (more might be added):

- [x] IP/TCP
- [ ] Bluetooth
- [ ] Serial (i.e. USB)

### Privacy
Nobody should know what your devices are doing. Although I might add features like Location sharing, you should always be able to adjust gets to know what.

### Platform Independence
The problem to solve is, that Apple's System only works on Apple Devices, so the solution should not be a system that also just works on one platform. I'm developing on Ubuntu but am planning to also have support for Windows and other Linux Distros.

### Encryption
Everything sent between devices should be Encrypted by default. Currently, this is done using RSA, but as I don't have a lot of experience in this field help is definitely wanted here.