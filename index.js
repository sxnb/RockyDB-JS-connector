let net = require('net');

/**
 * JS implementation of RockyDB client.
 *
 * The documentation for the commands is available here:
 * https://github.com/sxnb/RockyDB#available-commands
 */
class RockyClient {

    /**
     *
     */
    constructor() {
        this.client = new net.Socket();
        this.connected = false;
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    connect(host, port) {
        this.host = host;
        this.port = port;
        
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
    
    /**
     *
     */
    disconnect() {
        this.client.destroy();
        this.connected = false;
    }
    
    //-------------------------------------------------------------------------

    /**
     *
     */
    run(command, ...args) {
        if (!this.connected) {
            throw new Exception('Not connected to any RockyDB server.');
        }
        return new Promise((resolve, reject) => {
            this.client.write(command + ' ' + args.join(' ') + '\n');

            this.client.on('data', (data) => {
                resolve(this.bufferToString(data));
            });
        });
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    pset(key, value) {
        return this.run('pset', key, value);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    pupsert(key, value) {
        return this.run('pupsert', key, value);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    pget(key) {
        return this.run('pget', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    del(key) {
        return this.run('del', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    keys() {
        return this.run('keys');
    }
    
    //-------------------------------------------------------------------------

    /**
     *
     */
    dump(key) {
        return this.run('dump', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    lcreate(key) {
        return this.run('lcreate', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    ladd(key, value) {
        return this.run('ladd', key, value);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    ldel(key, value) {
        return this.run('ldel', key, value);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    lsize(key) {
        return this.run('lsize', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    qcreate(key) {
        return this.run('qcreate', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    qenqueue(key, value) {
        return this.run('qenqueue', key, value);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    qdequeue(key) {
        return this.run('qdequeue', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    qpeek(key) {
        return this.run('qpeek', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    qsize(key) {
        return this.run('qsize', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    qisempty(key) {
        return this.run('qisempty', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    screate(key) {
        return this.run('screate', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    spush(key, value) {
        return this.run('spush', key, value);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    spop(key) {
        return this.run('spop', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    speek(key) {
        return this.run('speek', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    ssize(key) {
        return this.run('ssize', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    sisempty(key) {
        return this.run('sisempty', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    ping() {
        return this.run('ping');
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    flush() {
        return this.run('flush');
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    type(key) {
        return this.run('type', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    exists(key) {
        return this.run('exists', key);
    }

    //-------------------------------------------------------------------------

    /**
     *
     */
    watch(key) {
        return this.run('watch', key);
    }
    
    //-------------------------------------------------------------------------

    /**
     *
     */
    bufferToString(buffer) {
        return buffer.toString('utf8');
    }

}

module.exports = RockyClient;