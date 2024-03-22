const SHA256 = require("crypto-js/sha256"); //Libreria Crypto


class Block {
  constructor(index,  data, prevHash) {
    this.index = index;
    this.timestamp = new Date();
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.getHash();
    this.nonce = 0;
  }
// utlizamos la libreria SHA256 para codificar datos del block
  getHash() {
    return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash +  this.nonce).toString();
  }
  
  //Dar mas seguridad al bloque
  mineBlock(difficulty) {
    while (!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.getHash();
        }
  }
 
}

module.exports = Block; 
