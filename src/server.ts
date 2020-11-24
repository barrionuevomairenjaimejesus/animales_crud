import { menuAnimales, menuAnimales2 } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
import { Animal, Animales, tAnimal} from './model/Animal'
import { db } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let nombre: string, especie: string, peso: number, altura: number, curado: boolean, operaciones: number
    let animal: Animal = new Animal("","",0,0,false,0)


    await setBD(false) // true BD local; false BD Atlas

    do {
        n = await menuAnimales()

        switch(n){
            case 0:
                console.log('Cerrando la aplicacion . . . ')
                break
            case 1:
                nombre = await leerTeclado('Mote/nombre del animal adoptado ')
                especie = await leerTeclado('Especie del animal adoptado ')
                peso =  parseInt( await leerTeclado('Introduzca el peso del animal'))
                altura =  parseInt( await leerTeclado('Introduzca la altura del animal '))
                curado =  false
                operaciones =  parseInt( await leerTeclado('Operaciones necesarias '))
                animal = new Animal(nombre,especie,peso,altura,curado,operaciones)
                try {
                    animal.peso = peso
                }catch(error){
                    console.log(error)
                    animal = new Animal("","",0,0,false,0)
                }
                break
            case 2:
                try{
                    let jaula = animal.jaula()
                    console.log(`Necesitaremos una jaula de ${jaula} m2`)
                }catch (e){
                    console.log("No tenemos datos del animal: " + e) //  Con el + e mandamos el error por consola 
                }
                break
            case 3:
                try{
                    let comida = animal.comida()
                    console.log(`Para ese animal necesitaremos ${comida} kilos de comida`)
                }catch (e){
                    console.log("No tenemos datos del animal: " + e)
                }
                break
            case 4:
                console.log("Si has entrado en esta opción es hora de poner al animal en libertad")
                curado = true
                break
            case 5:
                await db.conectarBD()
                const dSchema = {
                    _nombre: animal.nombre,
                    _especie: animal.especie,
                    _peso: animal.peso,
                    _altura: animal.altura,
                    _curado: animal.curado,
                    _operaciones: animal.operaciones
                }
                const oSchema = new Animales(dSchema)
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch 
                // Con el callback de save salta a la siguiente instrucción 
                // mientras se resuelve el callback y se desconecta y sigue el switch
                await oSchema.save()
                .then( (doc) => console.log('Tenemos un nuevo animal: '+ doc) )
                .catch( (err: any) => console.log('ERROR al guardar los datos: '+ err)) 
                // concatenando con cadena muestra sólo el mensaje

                await db.desconectarBD()
                break
            case 6:
                await db.conectarBD()
                nombre = await leerTeclado('Nombre del animal (no la especie)')
                await Animales.findOne( {_nombre: nombre}, 
                    (error, doc: any) => {
                        if(error) console.log(error)
                        else{
                            if (doc == null) console.log('Ese animal ha sido liberado o no se encuentra')
                            else {
                                console.log(`Datos de: ${animal.nombre}`+ doc)
                                 animal = 
                                    new Animal(doc._nombre,doc._especie,doc._peso,doc._altura,doc._curado,doc._operaciones)
                                    animal.altura = doc._altura  
                            }
                        }
                    } )
                await db.desconectarBD()
                break
            case 7:
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
            break
            case 8:
                await db.conectarBD()
                await Animales.findOneAndDelete(
                    { _nombre: animal.nombre }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`Ese animal ha sido liberado o no se encuentra`)
                            else console.log('Animal borrado!!: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            case 9:
                try{
                    let precomida = animal.precioComida()
                    console.log(`Para ese animal necesitaremos ${precomida} euros en comida`)
                }catch (e){
                    console.log("No tenemos datos del animal: " + e)
                }
                try{
                    let preoperacion = animal.precioOperacion()
                    console.log(`Para ese animal necesitaremos ${preoperacion} € para sus operaciones`)
                }catch (e){
                    console.log("No tenemos datos del animal: " + e)
                }
                try{
                    let total = animal.total()
                    console.log(`Para ese animal necesitaremos ${total} € para su mantenimiento`)
                }catch (e){
                    console.log("No tenemos datos del animal: " + e)
                }

                break                         
            default:
                console.log("No has elegido una opción valida.Por favor vuelve a intentarlo")
                break
        }
    }while (n != 0)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'proyecto'

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'Refugio'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.7gnbs.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

main()