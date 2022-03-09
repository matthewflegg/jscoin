import { Block } from "./block";

const date = Date.now().toString();
const genesisBlock = new Block(date);

class Blockchain {

    constructor() {
        this.chain = [new Block(date)]; // this.chain will contain all of the blocks
    }

    getLastBlock() { // Gets the last block on the blockchain
        const lastIndex = this.chain.length - 1;
        return this.chain[lastIndex];
    }

    appendBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();

        const immutableBlock = Object.freeze(block); // Freeze to ensure immutability
        this.chain.push(immutableBlock);
    }

    isValid(blockchain = this) { // Validate the blockchain

        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i - 1];

            if (currentBlock.hash !== currentBlock.getHash() ||
                prevBlock.hash !== prevBlock.getHash()) {
                return false;
            }
        }

        return true;
    }
}