import { leerTeclado } from '../vistas/lecturaTeclado'

export const menuAnimales = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Rescatar animal') //Meteremos los datos de un nuevo animal
    console.log('2.- Calcular medidas de jaula') //  Método  para poder calcular la jaula necesaria para el animal introducido  por última vez
    console.log('3.- Kilos de comida necesarios') // Con un método vamos a sacar por pantalla una aproximación de la comida necesaria
    console.log('4.- Cambiar estado a curado y listo para liberación.') // Solo cambia el estado del animal a curado porque todos son false por defecto
    console.log('5.- Mandar a la base de datos') // carga el animal que hayamos introducido en la base de datos que tenemos configurada
    console.log('6.- Cargar los datos de un animal') // Pide un nombre y lanza los datos de dicho animal
    console.log('7.- Modificar datos animales') // Cambia los datos de un animal localizado por su nombre
    console.log('8.- Liberar animal') // Borra a un animal
    console.log('9.- Mostrar dinero necesario para comida y operaciones así como el total.') //
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

export const menuAnimales2 = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Calcular medidas de jaula') //  Método  para poder calcular la jaula necesaria para el animal introducido  por última vez
    console.log('2.- Mostrar dinero necesario para comida y operaciones así como el total.') //
    console.log('3.- Kilos de comida necesarios') // Con un método vamos a sacar por pantalla una aproximación de la comida necesaria
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}