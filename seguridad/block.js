const SHA256 = require("crypto-js/sha256"); //importamos libreria

//declaramos datos del block
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
  
  //Minamos para mas seguridad los block
  mineBlock(difficulty) {
    while (!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.getHash();
        }
  }
 
}

module.exports = Block; // Conecta  las otras clases
