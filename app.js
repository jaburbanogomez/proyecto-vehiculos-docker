// Imports
const alert = require('alert')
const Blockchain = require("./seguridad/blockchain"); //importamos clase blockchain
const Block = require("./seguridad/block"); //importamos clase block
const medicamentos = require("./inventario/medicamentos"); //lista medicamentos
const express = require('express');
const app = express();
const port = 3000
const blockchain = new Blockchain()
var resultado = [];
var contador = 0;

app.use(express.json()); //Recibe los datos de las vistas
app.use(express.urlencoded());

// Static Files
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/imagenes', express.static(__dirname + '/imagenes'))

// Set Views
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.redirect('/index');
});

app.get('/index', function (req, res) {
  var medicamento = medicamentos[contador]
  res.render('index', { medicamento })
})

app.get('/info', function (req, res) {
  res.render('info')
})

app.get('/buscar', function (req, res) {
  res.render('buscar', { resultado })
})



app.post('/registrar', function (req, res) {// Trae los datos de la pagina web
  const action = req.body.action;
  switch (action) {
    case 'lista':
      if(contador<9){
        contador++;
        
      }
      res.redirect('/');
      break;
    case 'registrar':
      const campo = req.body; //la referencia se almacena en K
      //campo.precio, El precio es subjetivo
      const block = new Block({
        data: [campo.lote, campo.nombre, campo.destribuidor, campo.farmacia,
         campo.temperatura,  campo.fecha_f, campo.fecha_v]
      }); //se digitan los datos
      blockchain.addBlock(block); //se agrega el bloque a la cadena
      console.clear(); //se limpia la consola
      console.log(JSON.stringify(blockchain, null, 1)); //mustra los datos
      lista = blockchain
      console.log("creacion de un bloque");

      res.redirect('/'); //pide el siguiente block de la cadena
      alert('Compra realizada');
      break;
    default:
  }



});

app.post('/buscar', function (req, res) {// Trae los datos de la pagina web

  const action = req.body.action;
    
  switch (action) {
    case 'buscar':
      const consulta = req.body.hash; //Se genera una consulta de verificacion  
      console.log(consulta)
      blockchain.chain.forEach((result) => {
        if (consulta === result.hash) {
          resultado = result.data.index.data
          console.log(resultado)
        } else {
          alert('El medicamento no esta registrado');
          resultado = []
        }
      });

      
      break;
    case 'validar':
      alert('Este medicamento a sido adulterado');
      break;
    default:
  }

  res.redirect('/buscar');
});


//  Listen on port 3000
app.listen(port, () => {//se escucha el puerto por donde se va a ejecutar
  console.log(`Server funcionando en http://localhost:${port}`); // me dice si esta funcionando y el lugar 
});
