const crypto = require('crypto');

const SHA256 = message => {
    crypto.createHash('sha256')
        .update(message)
        .digest('hex');
}

export class Block {

    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        this.data = data; // this.data contains data such as transactions
        this.hash = this.getHash(); // this.hash calls this.getHash()
        this.prevHash = "";
    }

    getHash() { // Hash function
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data));
    }
}