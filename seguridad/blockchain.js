const SHA256 = require("crypto-js/sha256"); //importamos libreria
const Block = require("./block"); //llamas la clase block


//declaramos datos del chain
  class Blockchain{
    constructor(genesis, difficulty='0') {
      this.chain = [this.createGenesis(genesis)];
      this.difficulty=difficulty;
    }

//creamos el bloque genesis
  async initializeChain() {
    if (this.height === -1) {
      const block = new Block({ data: "Genesis Block" });
      await this.addBlock(block);
    }
  }

  //Agregamos el bloque genesis a la cadena
  createGenesis(genesis) {
    return new Block(0, "Genesis Block");
  }

  getLatestBlock() { // retorna  el prehast es decir el has anterior. 
    return this.chain[this.chain.length - 1];
  }

//Agregamos bloques a la cadena
  addBlock(newBlock){
    let prevBlock = this.getLatestBlock();
    let block=new Block(prevBlock.index+1, newBlock, prevBlock.hash);
    block.mineBlock(this.difficulty);
    this.chain.push(Object.freeze(block));
  }

}

module.exports = Blockchain; //conecta las clases
