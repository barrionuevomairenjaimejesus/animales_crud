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
    yield setBD(false);
    do {
        n = yield menu_1.menuAnimales();
        switch (n) {
            case 1:
                //Inntroducimos todos los datos por teclado de nuestro nuevo animal
                nombre = yield lecturaTeclado_1.leerTeclado('Mote/nombre del animal adoptado ');
                especie = yield lecturaTeclado_1.leerTeclado('Especie del animal adoptado ');
                peso = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el peso del animal'));
                altura = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la altura del animal '));
                curado = false; //Esta opción siempre nos aparecerá como false porque tienen que estar enfermos para entrar al refugio
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
            /*
                case 2:
                        //Buscaremos el animal en la base de datos y cambiará el estado de curado a verdadero.
                        console.log("Si has entrado en esta opción es hora de poner al animal en libertad")
                        await db.conectarBD()
                        nombre = await leerTeclado('Nombre del animal (no la especie)')
                        await Animales.findOne( {_nombre: nombre},
                            (error, doc: any) => {
                                if(error) console.log(error)
                                else{
                                    if (doc == null) console.log('Ese animal ha sido liberado o no se encuentra')
                                    else {
                                        try{
                                            let curar = animal.curar()
                                            console.log(`${curar}`)
                                        }catch (e){
                                            console.log("No tenemos datos del animal: " + e)
                                        }
                                    }
                                }
                            } )
                        break
                */
            case 2:
                //Guardaremos el animal que hemos introducido con la opción 1
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
                yield oSchema.save() //Con este callback lo que vamos a hacer es ejecutar todo lo demas, mientras el save hace su función
                    .then((doc) => console.log('Tenemos un nuevo animal: ' + doc))
                    .catch((err) => console.log('ERROR al guardar los datos: ' + err)); //Añadimos el mensaje también 
                yield database_1.db.desconectarBD();
                break;
            case 3:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Nombre del animal (no la especie)');
                yield Animal_1.Animales.findOne({ _nombre: nombre }, //Buscamos en nuestra base de datos con un findOne para obtener un solo documento
                (error, doc) => {
                    if (error)
                        console.log(error);
                    else {
                        if (doc == null)
                            console.log('Ese animal ha sido liberado o no se encuentra'); // Si no existe
                        else {
                            //Por lo tanto, si existe mandamos los datos del animal a la consola 
                            console.log(`Datos de: ${animal.nombre}` + doc);
                            animal =
                                new Animal_1.Animal(doc._nombre, doc._especie, doc._peso, doc._altura, doc._curado, doc._operaciones);
                            animal.altura = doc._altura;
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 4:
                yield database_1.db.conectarBD();
                yield Animal_1.Animales.findOneAndDelete(//Hacemos una busqueda, con este operador al encontrarlo lo eliminará
                { _nombre: animal.nombre }, //La busqueda la vaa hacer a través del nombre
                (err, doc) => {
                    if (err)
                        console.log(err); // Controlar el error en la ejecución
                    else {
                        if (doc == null)
                            console.log(`Ese animal ha sido liberado o no se encuentra`); //Si no está en la BD devuelve este mensaje
                        else
                            console.log('Animal borrado!!: ' + doc); // Si todo va bien mostrará este mensaje, y lo borrará de la BD
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 5:
                do {
                    n = yield menu_1.menuAnimales2();
                    switch (n) {
                        case 0:
                            console.log('Cerrando la aplicacion . . . ');
                            break;
                        case 1:
                            try {
                                let jaula = animal.jaula();
                                console.log(`Necesitaremos una jaula de ${jaula} m2`);
                            }
                            catch (e) {
                                console.log("No tenemos datos del animal: " + e); //  Con el + e mandamos el error por consola 
                            }
                            break;
                        case 2:
                            try {
                                let comida = animal.comida();
                                console.log(`Para ese animal necesitaremos ${comida} kilos de comida`);
                            }
                            catch (e) {
                                console.log("No tenemos datos del animal: " + e);
                            }
                            break;
                        case 3:
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
                break; //ERROR QUE NO ENTIENDO  
            case 0:
                console.log('Cerrando la aplicacion . . . '); //Solo nos sirve para salir del menú rapido
                break;
            default:
                console.log("No has elegido una opción valida.Por favor vuelve a intentarlo"); //Si no se introduce un caso de switch viene siempre a esta parte 
                break;
        }
    } while (n != 0);
});
//Conectividad con la base de datos en Mongodb Atlas
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'proyecto';
    const conexionLocal = `mongodb://localhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'Refugio'; //Nombre de la colección
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas'); //Introducir el usuario
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas'); //Introducir contraseña
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.7gnbs.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        //Con el comando anterior vamos a usar la url que me da mi propia página de Atlas y le pasamos las variables creadas
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
