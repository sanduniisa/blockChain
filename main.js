const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0,"29/04/2019","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1]
    }

    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(previousBlock.hash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let sanduniisa = new Blockchain();
sanduniisa.addBlock(new Block("1", "01/05/2019",{amount:452}));
sanduniisa.addBlock(new Block("2", "02/05/2019",{amount:853}));


sanduniisa.chain[1].data={amount: 8000};
sanduniisa.chain[1].hash=sanduniisa.chain[1].calculateHash();
console.log("Is Blockchain Valid?" + sanduniisa.isChainValid());
//console.log(JSON.stringify(sanduniisa, null, 4));

