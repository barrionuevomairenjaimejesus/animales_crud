import { menuAnimales, menuAnimales2 } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
import { Animal, Animales, tAnimal} from './model/Animal'
import { db } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let nombre: string, especie: string, peso: number, altura: number, curado: boolean, operaciones: number
    let animal: Animal = new Animal("","",0,0,false,0)


    await setBD(false) 

    do {
        n = await menuAnimales()

        switch(n){
            
            case 1:
                //Inntroducimos todos los datos por teclado de nuestro nuevo animal
                nombre = await leerTeclado('Mote/nombre del animal adoptado ')
                especie = await leerTeclado('Especie del animal adoptado ')
                peso =  parseInt( await leerTeclado('Introduzca el peso del animal'))
                altura =  parseInt( await leerTeclado('Introduzca la altura del animal '))
                curado =  false //Esta opción siempre nos aparecerá como false porque tienen que estar enfermos para entrar al refugio
                operaciones =  parseInt( await leerTeclado('Operaciones necesarias '))
                animal = new Animal(nombre,especie,peso,altura,curado,operaciones)
                try {
                    animal.peso = peso
                }catch(error){
                    console.log(error)
                    animal = new Animal("","",0,0,false,0)
                }
                break
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
                await oSchema.save()//Con este callback lo que vamos a hacer es ejecutar todo lo demas, mientras el save hace su función
                .then( (doc) => console.log('Tenemos un nuevo animal: '+ doc) )
                .catch( (err: any) => console.log('ERROR al guardar los datos: '+ err)) //Añadimos el mensaje también 

                await db.desconectarBD()
                break
            case 3:
                await db.conectarBD()
                nombre = await leerTeclado('Nombre del animal (no la especie)')
                await Animales.findOne( {_nombre: nombre}, //Buscamos en nuestra base de datos con un findOne para obtener un solo documento
                    (error, doc: any) => {
                        if(error) console.log(error)
                        else{
                            if (doc == null) console.log('Ese animal ha sido liberado o no se encuentra') // Si no existe
                            else {
                                //Por lo tanto, si existe mandamos los datos del animal a la consola 
                                console.log(`Datos de: ${animal.nombre}`+ doc) 
                                 animal = 
                                    new Animal(doc._nombre,doc._especie,doc._peso,doc._altura,doc._curado,doc._operaciones)
                                    animal.altura = doc._altura  
                            }
                        }
                    } )
                await db.desconectarBD()
                break
            case 4:
                await db.conectarBD()
                await Animales.findOneAndDelete( //Hacemos una busqueda, con este operador al encontrarlo lo eliminará
                    { _nombre: animal.nombre },  //La busqueda la vaa hacer a través del nombre
                    (err: any, doc) => {
                        if(err) console.log(err) // Controlar el error en la ejecución
                        else{
                            if (doc == null) console.log(`Ese animal ha sido liberado o no se encuentra`) //Si no está en la BD devuelve este mensaje
                            else console.log('Animal borrado!!: '+ doc) // Si todo va bien mostrará este mensaje, y lo borrará de la BD
                        }
                    })
                await db.desconectarBD()
                break 
            case 5:
                    do {
                        n = await menuAnimales2()
                        switch(n){
                         case 0:
                            console.log('Cerrando la aplicacion . . . ')
                        break
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
                }while (n != 0);
            break  //ERROR QUE NO ENTIENDO  
            case 0:
                console.log('Cerrando la aplicacion . . . ') //Solo nos sirve para salir del menú rapido
            break
            default:
                console.log("No has elegido una opción valida.Por favor vuelve a intentarlo") //Si no se introduce un caso de switch viene siempre a esta parte 
                break
        }
        
    }while (n != 0)
}

//Conectividad con la base de datos en Mongodb Atlas

const setBD = async (local: boolean) => {
    
    const bdLocal = 'proyecto' 

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'Refugio' //Nombre de la colección
        const userAtlas = await leerTeclado('Usuario BD Atlas') //Introducir el usuario
        const passAtlas = await leerTeclado('Password BD Atlas') //Introducir contraseña
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.7gnbs.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        //Con el comando anterior vamos a usar la url que me da mi propia página de Atlas y le pasamos las variables creadas
        db.cadenaConexion = conexionAtlas
    }
}

main()