import { Block } from "./block";

const date = Date.now().toString();
const genesisBlock = new Block(date);

export class Blockchain {

    constructor() {
        this.chain = [genesisBlock]; // this.chain will contain all of the blocks
        this.difficulty = 3;
        this.blockTime = 30000;
    }

    getLastBlock() { // gets the last block on the blockchain
        const lastIndex = this.chain.length - 1;
        return this.chain[lastIndex];
    }

    appendBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty); // wooooo minecraft

        const immutableBlock = Object.freeze(block); // freeze to ensure immutability
        this.chain.push(immutableBlock);
        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }

    isValid(blockchain = this) { // validate the blockchain

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