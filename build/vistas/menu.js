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
exports.menuAnimales2 = exports.menuAnimales = void 0;
const lecturaTeclado_1 = require("../vistas/lecturaTeclado");
exports.menuAnimales = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Rescatar animal'); //Meteremos los datos de un nuevo animal
    console.log('2.- Calcular medidas de jaula'); //  Método  para poder calcular la jaula necesaria para el animal introducido  por última vez
    console.log('3.- Kilos de comida necesarios'); // Con un método vamos a sacar por pantalla una aproximación de la comida necesaria
    console.log('4.- Cambiar estado a curado y listo para liberación.'); // Solo cambia el estado del animal a curado porque todos son false por defecto
    console.log('5.- Mandar a la base de datos'); // carga el animal que hayamos introducido en la base de datos que tenemos configurada
    console.log('6.- Cargar los datos de un animal'); // Pide un nombre y lanza los datos de dicho animal
    console.log('7.- Modificar datos animales'); // Cambia los datos de un animal localizado por su nombre
    console.log('8.- Liberar animal'); // Borra a un animal
    console.log('9.- Mostrar dinero necesario para comida y operaciones así como el total.'); //
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
exports.menuAnimales2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Calcular medidas de jaula'); //  Método  para poder calcular la jaula necesaria para el animal introducido  por última vez
    console.log('2.- Mostrar dinero necesario para comida y operaciones así como el total.'); //
    console.log('3.- Kilos de comida necesarios'); // Con un método vamos a sacar por pantalla una aproximación de la comida necesaria
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
