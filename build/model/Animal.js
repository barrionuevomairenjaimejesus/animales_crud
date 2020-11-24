"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animales = exports.Animal = void 0;
const mongoose_1 = require("mongoose");
class Animal {
    constructor(_nombre, _especie, _peso, _altura, _curado, _operaciones) {
        this._nombre = _nombre;
        this._especie = _especie;
        this._peso = _peso;
        this._altura = _altura;
        this._curado = _curado;
        this._operaciones = _operaciones;
    }
    get nombre() {
        return this._nombre;
    }
    get especie() {
        return this._especie;
    }
    get peso() {
        return this._peso;
    }
    get altura() {
        return this._altura;
    }
    get curado() {
        return this._curado;
    }
    get operaciones() {
        return this._operaciones;
    }
    set altura(_altura) {
        if (_altura <= -1) {
            throw "ERROR!! Un animal debe de medir algo para poder existir";
        }
        this._altura = _altura;
    }
    set peso(_peso) {
        if (_peso <= -1) {
            throw "ERROR!! Un animal debe de pesar algo para existir";
        }
        this._peso = _peso;
    }
    jaula() {
        let jaula;
        jaula = this._altura * 2;
        if (isNaN(this._altura)) {
            throw "No has introducido una altura, jaula no creada";
        }
        return jaula;
    }
    comida() {
        let comida;
        comida = this._peso * 0.5; // Vamos a suponer que cada animal consume la mitad de su peso a la semana en comida
        if (isNaN(this._peso)) {
            throw "No has introducido un peso, no podemos asignar la comida";
        }
        return comida;
    }
    precioComida() {
        let precomida;
        precomida = (this._peso * 0.5) * 2; // Suponemos que la comida se compra al por mayor y que no importa el tipo de comida 
        if (isNaN(this._peso)) {
            throw "No has introducido un peso, no podemos calcular el precio de la comida";
        }
        return precomida;
    }
    precioOperacion() {
        let preoperacion;
        preoperacion = (this._operaciones * 200); // Suponemos que el precio medio de una operación varia entre los 200 euros  
        if (this._operaciones >= 8) {
            throw "No podemos hacernos cargo de este animal, necesita demasiadas operaciones";
        }
        return preoperacion;
    }
    total() {
        let total;
        total = (this._operaciones * 200) + ((this._peso * 0.5) * 2); // Usamos todas las cuentas al mismo tiempo.  
        if (this._operaciones >= 8) {
            throw "No podemos hacernos cargo de este animal, necesita demasiadas operaciones";
        }
        if (isNaN(this._peso)) {
            throw "No has introducido un peso, no podemos calcular el precio de la comida";
        }
        return total;
    }
}
exports.Animal = Animal;
// Definimos el Schema
const animalSchema = new mongoose_1.Schema({
    _nombre: {
        type: String,
        unique: true
    },
    _especie: String,
    _peso: Number,
    _altura: Number,
    _curado: Boolean,
    _operaciones: {
        type: Number,
        max: 8
    }
});
exports.Animales = mongoose_1.model('Animales', animalSchema);
