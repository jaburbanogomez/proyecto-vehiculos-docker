const SHA256 = require("crypto-js/sha256"); //importamos libreria
const Block = require("./block"); //llamas la clase block



  class Blockchain{
    constructor(genesis, difficulty='0') {
      this.chain = [this.createGenesis(genesis)];
      this.difficulty=difficulty;
    }

//Creacion del bloque genesis
  async initializeChain() {
    if (this.height === -1) {
      const block = new Block({ data: "Genesis Block" });
      await this.addBlock(block);
    }
  }

  //Agregacion del bloque genesis a la cadena
  createGenesis(genesis) {
    return new Block(0, "Genesis Block");
  }

  getLatestBlock() { // devuelve el hash previo
    return this.chain[this.chain.length - 1];
  }

//Adicionar los bloques a la cadena
  addBlock(newBlock){
    let prevBlock = this.getLatestBlock();
    let block=new Block(prevBlock.index+1, newBlock, prevBlock.hash);
    block.mineBlock(this.difficulty);
    this.chain.push(Object.freeze(block));
  }

}

module.exports = Blockchain; 
