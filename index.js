let net = require('net');

/**
 * 
 */
class RockyClient {

    constructor(host, port) {
        this.client = new net.Socket();
        this.host = host;
        this.port = port;
        this.connected = false;
    }

    //-------------------------------------------------------------------------

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(this.port, this.host, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    this.connected = true;
                    resolve();
                }
            });   
        });
    }

    //-------------------------------------------------------------------------

    run(command, ...args) {
        return new Promise((resolve, reject) => {
            this.client.write(command + ' ' + args.join(' ') + '\n');

            this.client.on('data', (data) => {
                resolve(this.bin2String(data));
            });
        });
    }
    
    //-------------------------------------------------------------------------

    bin2String(buffer) {
        return buffer.toString('utf8');
    }

}

module.exports = RockyClient;