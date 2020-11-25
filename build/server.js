"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("./vistas/menu");
const lecturaTeclado_1 = require("./vistas/lecturaTeclado");
const Animal_1 = require("./model/Animal");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let nombre, especie, peso, altura, curado, operaciones;
    let animal = new Animal_1.Animal("", "", 0, 0, false, 0);
    yield setBD(false); // true BD local; false BD Atlas
    do {
        n = yield menu_1.menuAnimales();
        switch (n) {
            case 0:
                console.log('Cerrando la aplicacion . . . ');
                break;
            case 1:
                nombre = yield lecturaTeclado_1.leerTeclado('Mote/nombre del animal adoptado ');
                especie = yield lecturaTeclado_1.leerTeclado('Especie del animal adoptado ');
                peso = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el peso del animal'));
                altura = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la altura del animal '));
                curado = false;
                operaciones = parseInt(yield lecturaTeclado_1.leerTeclado('Operaciones necesarias '));
                animal = new Animal_1.Animal(nombre, especie, peso, altura, curado, operaciones);
                try {
                    animal.peso = peso;
                }
                catch (error) {
                    console.log(error);
                    animal = new Animal_1.Animal("", "", 0, 0, false, 0);
                }
                break;
            case 2:
                try {
                    let jaula = animal.jaula();
                    console.log(`Necesitaremos una jaula de ${jaula} m2`);
                }
                catch (e) {
                    console.log("No tenemos datos del animal: " + e); //  Con el + e mandamos el error por consola 
                }
                break;
            case 3:
                try {
                    let comida = animal.comida();
                    console.log(`Para ese animal necesitaremos ${comida} kilos de comida`);
                }
                catch (e) {
                    console.log("No tenemos datos del animal: " + e);
                }
                break;
            case 4:
                console.log("Si has entrado en esta opción es hora de poner al animal en libertad");
                animal.curado == true;
                break;
            case 5:
                yield database_1.db.conectarBD();
                const dSchema = {
                    _nombre: animal.nombre,
                    _especie: animal.especie,
                    _peso: animal.peso,
                    _altura: animal.altura,
                    _curado: animal.curado,
                    _operaciones: animal.operaciones
                };
                const oSchema = new Animal_1.Animales(dSchema);
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch 
                // Con el callback de save salta a la siguiente instrucción 
                // mientras se resuelve el callback y se desconecta y sigue el switch
                yield oSchema.save()
                    .then((doc) => console.log('Tenemos un nuevo animal: ' + doc))
                    .catch((err) => console.log('ERROR al guardar los datos: ' + err));
                // concatenando con cadena muestra sólo el mensaje
                yield database_1.db.desconectarBD();
                break;
            case 6:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Nombre del animal (no la especie)');
                yield Animal_1.Animales.findOne({ _nombre: nombre }, (error, doc) => {
                    if (error)
                        console.log(error);
                    else {
                        if (doc == null)
                            console.log('Ese animal ha sido liberado o no se encuentra');
                        else {
                            console.log(`Datos de: ${animal.nombre}` + doc);
                            animal =
                                new Animal_1.Animal(doc._nombre, doc._especie, doc._peso, doc._altura, doc._curado, doc._operaciones);
                            animal.altura = doc._altura;
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
                /*      case 7:
                          do {
                              n = await menuAnimales2()
                              switch(n){
                              case 1:
                                  try{
                                      let jaula = animal.jaula()
                                      console.log(`Necesitaremos una jaula de ${jaula} m2`)
                                  }catch (e){
                                      console.log("No tenemos datos del animal: " + e) //  Con el + e mandamos el error por consola
                                  }
                              break
                              case 2:
                                  try{
                                      let comida = animal.comida()
                                      console.log(`Para ese animal necesitaremos ${comida} kilos de comida`)
                                  }catch (e){
                                      console.log("No tenemos datos del animal: " + e)
                                  }
                              break
                              case 3:
                              break
                              default:
                          console.log("No has elegido una opción valida.Por favor vuelve a intentarlo")
                          break
                          } while (n != 0);
                      }
                 */ break;
            case 8:
                yield database_1.db.conectarBD();
                yield Animal_1.Animales.findOneAndDelete({ _nombre: animal.nombre }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (doc == null)
                            console.log(`Ese animal ha sido liberado o no se encuentra`);
                        else
                            console.log('Animal borrado!!: ' + doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 9:
                try {
                    let precomida = animal.precioComida();
                    console.log(`Para ese animal necesitaremos ${precomida} euros en comida`);
                }
                catch (e) {
                    console.log("No tenemos datos del animal: " + e);
                }
                try {
                    let preoperacion = animal.precioOperacion();
                    console.log(`Para ese animal necesitaremos ${preoperacion} € para sus operaciones`);
                }
                catch (e) {
                    console.log("No tenemos datos del animal: " + e);
                }
                try {
                    let total = animal.total();
                    console.log(`Para ese animal necesitaremos ${total} € para su mantenimiento`);
                }
                catch (e) {
                    console.log("No tenemos datos del animal: " + e);
                }
                break;
            default:
                console.log("No has elegido una opción valida.Por favor vuelve a intentarlo");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'proyecto';
    const conexionLocal = `mongodb://localhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'Refugio';
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas');
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas');
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.7gnbs.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
