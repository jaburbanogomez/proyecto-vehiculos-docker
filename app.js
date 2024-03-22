// Imports
const alert = require('alert')
const Blockchain = require("./securityBlockchain/blockchain"); //importamos clase blockchain
const Block = require("./securityBlockchain/block"); //importamos clase block
const automovil = require("./listadovehiculos/vehiculo"); //lista vehiculos registrados
const express = require('express');
const app = express();
const port = 3000
const blockchain = new Blockchain()
var indice = [];
var cantidadListado = 0;

app.use(express.json()); //Datos Vistas
app.use(express.urlencoded());

// Filas Estaticas
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/images', express.static(__dirname + '/images'))

// Entrada de formato o extension de las vistas
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.redirect('/registrar');
});

app.get('/', function (req, res) {
  res.redirect('/index');
});

app.get('/index', function (req, res) {
  res.render('index')
})
app.get('/', function (req, res) {
  res.redirect('/login');
});

app.get('/login', function (req, res) {
  res.render('login')
})

app.get('/', function (req, res) {
  res.redirect('/about');
});

app.get('/about', function (req, res) {
  res.render('about')
})

app.get('/', function (req, res) {
  res.redirect('/client');
});

app.get('/client', function (req, res) {
  res.render('client')
})

app.get('/', function (req, res) {
  res.redirect('/compra');
});

app.get('/compra', function (req, res) {
  res.render('compra')
})

app.get('/', function (req, res) {
  res.redirect('/contact');
});

app.get('/contact', function (req, res) {
  res.render('contact')

})

app.get('/', function (req, res) {
  res.redirect('/gallery');
});

app.get('/gallery', function (req, res) {
  res.render('gallery')
})


app.get('/', function (req, res) {
  res.redirect('/signup');
});

app.get('/signup', function (req, res) {
  res.render('signup')
})

app.get('/', function (req, res) {
  res.redirect('/services');
});

app.get('/services', function (req, res) {
  res.render('services')
})



app.get('/registrar', function (req, res) {
  var vehiculo = automovil[cantidadListado]
  res.render('guardarCadena', { vehiculo })
})

app.get('/actualizar', function (req, res) {
  var vehiculo = {
    placa: indice[0], propietario: indice[1], identificacion: indice[2], marca: indice[3],
    linea: indice[4], numeroMotor: indice[5], numeroChasis: indice[6], fecha: indice[7]
  }
  res.render('actualizarCadena', { vehiculo })
})



app.post('/registrar', function (req, res) {// Obtenemos los datos de la pagina 
  const action = req.body.action;
  switch (action) {
    case 'consultarListado':
      if (cantidadListado < 4) {
        cantidadListado++;
      }
      res.redirect('/registrar');
      break;
    case 'registrar':
      const campo = req.body;

      const block = new Block({
        data: [campo.placa, campo.propietario, campo.identificacion, campo.marca, campo.linea, campo.numeroMotor, campo.numeroChasis,
        campo.fecha]
      });
      blockchain.addBlock(block); //Agregar Bloque
      console.clear();
      console.log(JSON.stringify(blockchain, null, 1)); //Ver los datos
      res.redirect('/registrar'); //Espera por el bloque nuevo
      alert('Vehiculo Agregado');
      //console.log(blockchain)
      break;
    default:
  }



});

var consulta = '';
var auxindex = 0;
app.post('/actualizar', function (req, res) {// Obtenemos los datos de la pagina 

  const action = req.body.action;
  switch (action) {
    case 'buscar':
      consulta = req.body.placa; //Se genera una consulta de verificacion  
      for (let index = 1; index < blockchain.chain.length; index++) {
        const element = blockchain.chain[index];
        if (consulta === element.data.index.data[0]) {
          indice = element.data.index.data
          console.log(indice)
          auxindex = index
          break;
        } else {
          alert('La placa del vehiculo no cuenta con un registro');
          indice = []
        }

      }

      break;
    case 'modificar':
      const campo = req.body;
      var data = [campo.placa, campo.propietario, campo.identificacion, campo.marca, campo.linea, campo.numeroMotor, campo.numeroChasis,
      campo.fecha]
      blockchain.chain[auxindex].data.index.data = data;
      console.clear();
      console.log(JSON.stringify(blockchain, null, 1)); //Ver los datos
      alert('Se actualizaron los datos del propietario')

      break;
    default:
  }

  res.redirect('/actualizar');
});



app.listen(port, () => {
  console.log(`Server funcionando en http://localhost:${port}`);
});
